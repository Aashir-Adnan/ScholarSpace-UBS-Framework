const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { executeQuery } = require("../../../Database/queryExecution");
const mysql = require("mysql");
require("dotenv").config({ path: "../Server/.env" });
const {
  frontEndTemplate,
  crudTemplates,
  groupedFrontTemplates,
  groupedTemplates,
  dropdownTemplates,
  genCrudParameters,
} = require("../objectTemplates/objectTemplates");
const { projectDB } = require("../../../Database/projectDb");

const blacklist = [
  "user_role_designation_permissions",
  "user_devices",
  "dynamic_attachments",
  "attachments",
];

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE,
  timezone: process.env.DB_TIMEZONE,
  port: process.env.DB_PORT,
};

const dbType = process.env.DB_TYPE

function fetchTablesQuery(db) {
  if (dbType === "postgres") {
    return `
      SELECT table_name as TABLE_NAME
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;
  } else if (dbType === "mysql") {
    return `
      SELECT TABLE_NAME
      FROM information_schema.tables
      WHERE table_schema = '${db}'
    `;
  } else {
    throw new Error("Unsupported DB type: " + dbType);
  }
}

function getTableColumnsQuery() {
  if (dbType === "mysql") {
    return `
      SELECT 
        c.TABLE_NAME,
        c.COLUMN_NAME, 
        c.COLUMN_KEY,
        c.IS_NULLABLE,
        c.DATA_TYPE,
        c.COLUMN_TYPE,
        k.REFERENCED_TABLE_NAME, 
        k.REFERENCED_COLUMN_NAME, 
        k.CONSTRAINT_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS c
      LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k
        ON c.TABLE_SCHEMA = k.TABLE_SCHEMA 
       AND c.TABLE_NAME = k.TABLE_NAME 
       AND c.COLUMN_NAME = k.COLUMN_NAME
      WHERE c.TABLE_SCHEMA = ?
        AND c.TABLE_NAME = ?
      ORDER BY c.ORDINAL_POSITION ASC
    `;
  } else if (dbType === "postgres") {
    return `
 SELECT 
        c.table_name AS "TABLE_NAME",
        c.column_name AS "COLUMN_NAME",
        tc.constraint_type AS "COLUMN_KEY",
        c.is_nullable AS "IS_NULLABLE",
        c.data_type AS "DATA_TYPE",
        CASE 
          WHEN c.character_maximum_length IS NOT NULL 
          THEN c.udt_name || '(' || c.character_maximum_length || ')'
          ELSE c.udt_name
        END AS "COLUMN_TYPE",
        kcu.table_name AS "REFERENCED_TABLE_NAME",
        kcu.column_name AS "REFERENCED_COLUMN_NAME",
        tc.constraint_name AS "CONSTRAINT_NAME"
      FROM information_schema.columns c
      LEFT JOIN information_schema.key_column_usage k
        ON c.table_name = k.table_name
       AND c.column_name = k.column_name
       AND c.table_schema = k.table_schema
      LEFT JOIN information_schema.table_constraints tc
        ON k.constraint_name = tc.constraint_name
       AND k.table_schema = tc.table_schema
      LEFT JOIN information_schema.constraint_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
       AND tc.table_schema = kcu.table_schema
      WHERE c.table_schema = $1
        AND c.table_name = $2
      ORDER BY c.ordinal_position ASC    `;
  } else {
    throw new Error("Unsupported DB type: " + dbType);
  }
}

function getReferenceCountQuery() {
  if (dbType === "mysql") {
    return `
      SELECT COUNT(*) AS REF_COUNT
      FROM information_schema.key_column_usage
      WHERE referenced_table_schema = ?
        AND referenced_table_name = ?
    `;
  } else if (dbType === "postgres") {
    return `
      SELECT COUNT(*) AS "REF_COUNT"
      FROM information_schema.key_column_usage
      WHERE constraint_schema = $1
        AND referenced_table_name = $2
    `;
  } else {
    throw new Error("Unsupported DB type: " + dbType);
  }
}

function getReferencedTablesQuery() {
  if (dbType === "mysql") {
    return `
      SELECT REFERENCED_TABLE_NAME
      FROM information_schema.key_column_usage
      WHERE table_schema = ?
        AND table_name = ?
        AND referenced_table_name IS NOT NULL
    `;
  } else if (dbType === "postgres") {
    return `
      SELECT kcu.table_name AS "REFERENCED_TABLE_NAME"
      FROM information_schema.key_column_usage kcu
      JOIN information_schema.table_constraints tc
        ON kcu.constraint_name = tc.constraint_name
       AND kcu.constraint_schema = tc.constraint_schema
      WHERE kcu.constraint_schema = $1
        AND kcu.table_name = $2
        AND kcu.table_name IS NOT NULL
    `;
  } else {
    throw new Error("Unsupported DB type: " + dbType);
  }
}

function getReferencingTablesQuery() {
  if (dbType === "mysql") {
    return `
      SELECT TABLE_NAME
      FROM information_schema.key_column_usage
      WHERE table_schema = ?
        AND referenced_table_name = ?
        AND column_name NOT IN ('UpdatedBy', 'updatedBy')
    `;
  } else if (dbType === "postgres") {
    return `
      SELECT kcu.table_name AS "TABLE_NAME"
      FROM information_schema.key_column_usage kcu
      JOIN information_schema.table_constraints tc
        ON kcu.constraint_name = tc.constraint_name
       AND kcu.constraint_schema = tc.constraint_schema
      WHERE kcu.constraint_schema = $1
        AND kcu.referenced_table_name = $2
        AND kcu.column_name NOT IN ('UpdatedBy', 'updatedBy')
    `;
  } else {
    throw new Error("Unsupported DB type: " + dbType);
  }
}


const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const snakeToCamel = (str) => {
  return str?.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase());
};
const lowerSnakeToCamel = (str) => {
  return str
    .replace(/_([a-z])/g, (match, group1) => group1.toUpperCase())
    .replace(/^([A-Z])/, (match) => match?.toLowerCase());
};

function snakeToSeparatedWords(snakeCaseStr) {
  return snakeCaseStr
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}



async function initBaseObjects(permissions = true) {
  try {
    let connection = await projectDB();
    const tables = await executeQuery(
      fetchTablesQuery(dbConfig.database),
      [],
      connection
    );
    console.log("TABLES: 12345", tables)
    console.log("LOOK AT DIR NAME: ", __dirname)
    console.log("LOOK AT DIR NAME: ", path.join(__dirname, "..", "..", "..", "Objects"))
    const backendFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "Objects",
      "Grouped_Objects"
    );
    const backendCrudFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "Objects",
      "Crud_Objects"
    );
    const dropdownFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "Objects",
      "Dropdown_Objects"
    );
    const frontendFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "Frontend",
      "src",
      "root",
      "Pages",
      "Cruds",
      "Tables"
    );

    if (!fs.existsSync(backendCrudFolder)) {
      fs.mkdirSync(backendCrudFolder, { recursive: true });
    }

    if (!fs.existsSync(frontendFolder)) {
      fs.mkdirSync(frontendFolder, { recursive: true });
    }

    if (!fs.existsSync(backendFolder)) {
      fs.mkdirSync(backendFolder, { recursive: true });
    }

    if (!fs.existsSync(dropdownFolder)) {
      fs.mkdirSync(dropdownFolder, { recursive: true });
    }

    let documentationContent = "";
    let allColumns = {};
    const tableAnalysis = {};

    for (const { TABLE_NAME } of tables) {
      connection = await projectDB();
      const columns = await executeQuery(
        getTableColumnsQuery(),
        [dbConfig.database, TABLE_NAME],
        connection
      );
      allColumns[TABLE_NAME] = columns;

      const uniqueAttributes = columns.filter(
        (col) =>
          col.COLUMN_KEY !== "PRI" &&
          !col.CONSTRAINT_NAME &&
          !col.REFERENCED_TABLE_NAME &&
          ![
            "start_date",
            "end_date",
            "status",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
            "updatedAt",
            "createdAt",
            "Status",
            "excluded_id",
            "included_id",
          ].includes(col.COLUMN_NAME)
      );

      let weightedReferenceValue = 0;
      let weightedConstraintValue = 0;

      for (const col of columns) {
        if (col.REFERENCED_TABLE_NAME) {
          weightedConstraintValue++;
        }
      }
      connection = await projectDB();

      const referencesToThisTable = await executeQuery(
        getReferenceCountQuery(),
        [dbConfig.database, TABLE_NAME],
        connection
      );

      if (referencesToThisTable.length > 0) {
        weightedReferenceValue += referencesToThisTable[0].refCount;
      }

      tableAnalysis[TABLE_NAME] = {
        UniqueTable: uniqueAttributes.length >= weightedConstraintValue,
        UniqueValue: uniqueAttributes.length,
        WRV: weightedReferenceValue,
        WCV: weightedConstraintValue,
      };

      const primaryKey = columns.find(
        (col) => col.COLUMN_KEY === "PRI"
      )?.COLUMN_NAME;

      if (!primaryKey) {
        console.warn(`No primary key found for table ${TABLE_NAME}. Skipping.`);
        continue;
      }
    }

    const sortedTableAnalysis = Object.entries(tableAnalysis)
      .sort(([, a], [, b]) => b.WRV - a.WRV)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    console.log("Sorted Table Analysis:", sortedTableAnalysis);

    const groups = {};
    const processedTables = new Set();

    async function getReferences(tableName) {
      connection = await projectDB();
      const references = await executeQuery(
        getReferencedTablesQuery(),
        [dbConfig.database, tableName],
        connection
      );
      return references.map((ref) => ref.REFERENCED_TABLE_NAME);
    }

    async function getReferencedBy(tableName) {
      connection = await projectDB();
      const referencedBy = await executeQuery(
        getReferencingTablesQuery(),
        [dbConfig.database, tableName],
        connection
      );
      return referencedBy.map((ref) => ref.TABLE_NAME);
    }

    for (const [tableName, analysis] of Object.entries(sortedTableAnalysis)) {
      if (processedTables.has(tableName)) continue;
      if (!sortedTableAnalysis[tableName].UniqueTable) continue;

      const group = new Set();
      group.add(tableName);

      const groupProcessedTables = new Set();

      const referencedTables = await getReferences(tableName);
      referencedTables.forEach((refTable) => {
        group.add(refTable);
      });

      const referencedByTables = await getReferencedBy(tableName);
      referencedByTables.forEach((refTable) => {
        group.add(refTable);
      });

      const processedIntermediateTables = new Set([
        ...referencedTables,
        ...referencedByTables,
      ]);

      while (processedIntermediateTables.size > 0) {
        const currentTable = Array.from(processedIntermediateTables).pop();
        processedIntermediateTables.delete(currentTable);

        if (!groupProcessedTables.has(currentTable)) {
          const currentAnalysis = sortedTableAnalysis[currentTable];
          if (currentAnalysis && !currentAnalysis.UniqueTable) {
            const relatedReferencedBy = await getReferencedBy(currentTable);

            [...relatedReferencedBy].forEach((relatedTable) => {
              if (
                !groupProcessedTables.has(relatedTable) &&
                !sortedTableAnalysis[relatedTable].UniqueTable &&
                sortedTableAnalysis[relatedTable].WCV +
                sortedTableAnalysis[relatedTable].WRV <=
                2
              ) {
                group.add(relatedTable);
                processedIntermediateTables.add(relatedTable);
              }
            });
          }

          groupProcessedTables.add(currentTable);
        }
      }

      groups[tableName] = Array.from(group).filter(
        (entry) => !blacklist.includes(entry)
      );

    }

    for (const { TABLE_NAME } of tables) {
      const columns = allColumns[TABLE_NAME];
      const primaryKey = columns.find(
        (col) => col.COLUMN_KEY === "PRI"
      )?.COLUMN_NAME;

      if (!primaryKey) {
        console.warn(`No primary key found for table ${TABLE_NAME}. Skipping.`);
        continue;
      }
      const capitalizedTableName = capitalizeFirstLetter(TABLE_NAME);

      const backendTableFolder = path.join(
        backendCrudFolder,
        capitalizedTableName
      );
      if (!fs.existsSync(backendTableFolder)) {
        fs.mkdirSync(backendTableFolder);
      }
      const crudFileName = path.join(
        backendTableFolder,
        `${capitalizedTableName}.js`
      );

      let crudFileContent = `
        /* CRUD Objects for table: ${TABLE_NAME} */
      `;
      crudFileContent += crudTemplates.object(
        TABLE_NAME,
        columns,
        capitalizedTableName,
        primaryKey,
        allColumns,
        permissions
      );
      documentationContent += `Crud${capitalizedTableName} , URL :: /api/crud/${capitalizedTableName} \n`;
      fs.writeFileSync(crudFileName, crudFileContent.trim(), "utf8");
      // //console.log(`Generated CRUD object for table: ${capitalizedTableName}`);

      const backendParametersFileName = path.join(
        backendTableFolder,
        `CRUD_parameters.js`
      );

      let backendParametersFileContent = crudTemplates.parameters(
        TABLE_NAME,
        columns,
        capitalizedTableName,
        primaryKey
      );
      fs.writeFileSync(
        backendParametersFileName,
        backendParametersFileContent.trim(),
        "utf8"
      );

      let dropdownFileContent = "";
      const dropdownFileName = path.join(
        dropdownFolder,
        `${capitalizedTableName}_dropdown.js`
      );
      dropdownFileContent += await dropdownTemplates.object(
        TABLE_NAME,
        allColumns
      );
      if (dropdownFileContent != undefined) {
        fs.writeFileSync(dropdownFileName, dropdownFileContent.trim(), "utf-8");
      }

      if (!blacklist.includes(TABLE_NAME)) {
        const frontendTableFolder = path.join(
          frontendFolder,
          capitalizedTableName
        );
        if (!fs.existsSync(frontendTableFolder)) {
          fs.mkdirSync(frontendTableFolder);
        }

        const frontendFileName = path.join(
          frontendTableFolder,
          `CRUD_serverCommunication.js`
        );
        const frontendJSONFileName = path.join(
          frontendTableFolder,
          `CRUD_serverCommunication.json`
        )
        const parametersFileName = path.join(
          frontendTableFolder,
          `CRUD_parameters.js`
        );
        const parametersJSONFileName = path.join(
          frontendTableFolder,
          `CRUD_parameters.json`
        )
        let frontendFileContent = `
          /* Frontend Objects for table: ${TABLE_NAME} */
        `;


        

        frontendFileContent += frontEndTemplate.object(
          TABLE_NAME,
          columns
        );

        let parametersFileContent = `
          /* Frontend Parameters for table: ${TABLE_NAME} */
        `;
        parametersFileContent += frontEndTemplate.parameters(
          TABLE_NAME,
          columns,
          capitalizedTableName,
          primaryKey,
          allColumns,
          tableAnalysis
        );

        fs.writeFileSync(frontendFileName, frontendFileContent.trim(), "utf8");

        fs.writeFileSync(
          parametersFileName,
          parametersFileContent.trim(),
          "utf8"
        );


        let extraColumns = [];

        columns.forEach((col) => {
          if (
            col.COLUMN_NAME.endsWith("_id") &&
            !col.COLUMN_NAME.includes("attachment") && !(col.REFERENCED_TABLE_NAME == "attachments")
          ) {
            const referencedTable = col.REFERENCED_TABLE_NAME;

            if (referencedTable === TABLE_NAME) {
              console.warn(
                `Self-referencing foreign key detected in TABLE_NAME ${TABLE_NAME}: ${col.COLUMN_NAME} references ${primaryKey}`
              );
              return; // Don't forget to return if you want to skip the rest
            }

            if (allColumns[referencedTable]) {
              let nameColumn = allColumns[referencedTable].find((c) =>
                c.COLUMN_NAME.endsWith("_name") || c.COLUMN_NAME.endsWith("name")
              );
              if (nameColumn) {
                // Create a shallow copy so the original object is untouched
                let shallowCopy = { ...nameColumn };
                shallowCopy.NAME_COLUMN = col.REFERENCED_TABLE_NAME;
                extraColumns.push(shallowCopy);
              }
            }
          }
        });

        let new_columns = [...columns, ...extraColumns];
        let parameters = genCrudParameters(TABLE_NAME, new_columns);
        console.log("TABLE NAME:", TABLE_NAME)
        if (TABLE_NAME == "plannedcourses") console.log("PARAMETERS:", parameters)
        let temp_parameters= JSON.parse(`[${parameters}]`)
        console.log(typeof temp_parameters)
        const aliasedColumns = columns
        .map(
          (col) =>
            `${TABLE_NAME}.${col.COLUMN_NAME} as ${snakeToCamel(TABLE_NAME)}_${snakeToCamel(
              col.COLUMN_NAME
            )}`
        )
        .join(",");

        let frontendJsoonFileContent = frontEndTemplate.json(TABLE_NAME, columns, temp_parameters)
        fs.writeFileSync(frontendJSONFileName, frontendJsoonFileContent.trim(), "utf8")


        parameters = `
        {
          "steps": [
              {
              "title": "${snakeToCamel(TABLE_NAME)} Info",
              "parameters": {
                  "fields": [
                  {
                      "name": "${snakeToCamel(TABLE_NAME)}",
                      "type": "section",
                      "hideInCreateForm": false,
                      "visible": false,
                      "required": false,
                      "disabled": false,
                      "validations": "",
                      "dependancyCheck": false,
                      "isPrefilled": false,
                      "source": "req.body",
                      "title": "${snakeToSeparatedWords(capitalizedTableName)}",
                      "childFields": [ ${parameters} 
                      ]
                  }
                  ]
              },
              "buttons": [
                  {
                  "type": "submit",
                  "label": "Submit"
                  }
              ]
              }
          ],
          "colMapper": "{${aliasedColumns}}"
          }
        `
        fs.writeFileSync(
          parametersJSONFileName,
          parameters,
          "utf8"
        )
      }
    }
    for (const [groupKey, groupTables] of Object.entries(groups)) {

        if (!["task_flows", "task_flow_steps", "tasks"].includes(groupKey)){
          let parametersFileContent = "";
          const objectName = capitalizeFirstLetter(groupKey);
          const backendTableFolder = path.join(backendFolder,  objectName);
          if (!fs.existsSync(backendTableFolder)) {
              fs.mkdirSync(backendTableFolder);
          }
          const crudFileName = path.join(backendTableFolder, `Grouped_${objectName}.js`);
          let crudFileContent = `
          `;
          crudFileContent += await groupedTemplates.object(groupTables, allColumns, objectName, permissions);
          fs.writeFileSync(crudFileName, crudFileContent.trim(), 'utf8');

          const frontendTableFolder = path.join(frontendFolder, objectName);
          if (!fs.existsSync(frontendTableFolder)) {
              fs.mkdirSync(frontendTableFolder);
          }

          let frontendContent = "";
          const frontendObject = path.join(frontendTableFolder, `CRUD_serverCommunication.js`);
          frontendContent += groupedFrontTemplates.object(groupKey, allColumns[groupKey], objectName);
          fs.writeFileSync(frontendObject, frontendContent.trim(), 'utf8');
          //console.log(`Generated frontend parameters for table: ${objectName}`);

          const parametersFileName = path.join(frontendTableFolder, `CRUD_parameters.js`);
          parametersFileContent += groupedFrontTemplates.parameters(groupTables, allColumns, objectName, tableAnalysis);
          fs.writeFileSync(parametersFileName, parametersFileContent.trim(), 'utf8');
          //console.log(`Generated frontend parameters for table: ${objectName}`);

          const backendParametersFileName = path.join(backendTableFolder, `CRUD_parameters.js`);
          let backendParametersFileContent = groupedTemplates.parameters(groupTables, allColumns, objectName, tableAnalysis);
          fs.writeFileSync(backendParametersFileName, backendParametersFileContent.trim(), 'utf8');
        }

        //console.log(`Generated dropdown API for table: ${objectName}`);
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    }

    console.log("All files generated successfully!");
    return groups, tables;
  } catch (error) {
    console.error("Error generating files:", error);
  }
}

module.exports = { initBaseObjects };
