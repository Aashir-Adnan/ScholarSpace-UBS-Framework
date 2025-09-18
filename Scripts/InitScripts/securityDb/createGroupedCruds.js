const fs = require("fs");
const path = require("path");
const { executeQuery } = require("../../../Database/queryExecution");
const mysql = require("mysql");
const {
  frontEndTemplate,
  crudTemplates,
  groupedFrontTemplates,
  groupedTemplates,
  dropdownTemplates,
} = require("../objectTemplates/objectTemplates");
const { projectDB } = require("../../../Database/projectDb");
require("dotenv").config({ path: "../Server/.env" });

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const dbConfig = {
  host: process.env.SECURITY_DB_HOST,
  user: process.env.SECURITY_DB_USER,
  password: process.env.SECURITY_DB_PW,
  database: process.env.SECURITY_DB_DATABASE,
  timezone: process.env.SECURITY_DB_TIMEZONE,
  port: process.env.SECURITY_DB_PORT,
};


const dbType = process.env.DB_TYPE


function fetchTablesQuery() {
  if (dbType === "postgres") {
    return `
      SELECT table_name as TABLE_NAME
      FROM information_schema.tables
      WHERE table_schema = $1
    `;
  } else if (dbType === "mysql") {
    return `
      SELECT TABLE_NAME
      FROM information_schema.tables
      WHERE table_schema = ?
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

async function initSecurityObjects(permissions = true) {
  try {
    let tables = await executeQuery(
      fetchTablesQuery(),
      [dbConfig.database],
      await projectDB()
    );

    const backendCrudFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "Objects",
      "Security_Objects",
      "Crud_Objects"
    );
    const dropdownFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "Objects",
      "Security_Objects",
      "Dropdown_Objects"
    );
    const frontendFolder = path.join(
      __dirname,
      "..",
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
    const sidePropsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "Frontend",
      "src",
      "root",
      "Utils",
      "Props"
    );

    if (!fs.existsSync(sidePropsFolder)) {
      fs.mkdirSync(sidePropsFolder, { recursive: true });
    }

    if (!fs.existsSync(backendCrudFolder)) {
      fs.mkdirSync(backendCrudFolder, { recursive: true });
    }

    if (!fs.existsSync(frontendFolder)) {
      fs.mkdirSync(frontendFolder, { recursive: true });
    }

    if (!fs.existsSync(dropdownFolder)) {
      fs.mkdirSync(dropdownFolder, { recursive: true });
    }

    let allColumns = {};
    let connection;
    let tableAnalysis = {};
    for (const { TABLE_NAME } of tables) {
      connection = await await projectDB();
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
      let uniqueValue = 0;

      for (const col of columns) {
        if (col.REFERENCED_TABLE_NAME) {
          weightedConstraintValue++;
        }
      }
      connection = await await projectDB();
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
    tables = [...tables, { TABLE_NAME: "user_devices" }];
      let user_devices_columns = await executeQuery(
        getTableColumnsQuery(),
        [process.env.DB_DATABASE, "user_devices"],
        await projectDB()
      );
    allColumns["user_devices"] = user_devices_columns;

    for (const { TABLE_NAME } of tables) {
      const columns = allColumns[TABLE_NAME];
      console.log("TABLE NAME: ", TABLE_NAME);
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

      const frontendTableFolder = path.join(
        frontendFolder,
        capitalizedTableName
      );
      if (!fs.existsSync(frontendTableFolder)) {
        fs.mkdirSync(frontendTableFolder);
      }

      const crudFileName = path.join(
        backendTableFolder,
        `${capitalizedTableName}.js`
      );
      const frontendFileName = path.join(
        frontendTableFolder,
        `CRUD_serverCommunication.js`
      );
      const parametersFileName = path.join(
        frontendTableFolder,
        `CRUD_parameters.js`
      );
      const backendParametersFileName = path.join(
        backendTableFolder,
        `CRUD_parameters.js`
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
        permissions,
        "securitydb"
      );
      fs.writeFileSync(crudFileName, crudFileContent.trim(), "utf8");

      let frontendFileContent = `
          /* Frontend Objects for table: ${TABLE_NAME} */
        `;
      frontendFileContent += frontEndTemplate.object(
        TABLE_NAME,
        columns,
        capitalizedTableName,
        primaryKey,
        allColumns
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

      let backendParametersFileContent = crudTemplates.parameters(
        TABLE_NAME,
        columns,
        capitalizedTableName,
        primaryKey
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

      fs.writeFileSync(frontendFileName, frontendFileContent.trim(), "utf8");

      fs.writeFileSync(
        parametersFileName,
        parametersFileContent.trim(),
        "utf8"
      );

      fs.writeFileSync(
        backendParametersFileName,
        backendParametersFileContent.trim(),
        "utf8"
      );
    }

    let groups = {};
    tables.forEach((table) => {
      groups[table.TABLE_NAME] = [table.TABLE_NAME];
    });
    return groups;
  } catch (error) {
    console.error("Error generating files:", error);
  }
}

module.exports = { initSecurityObjects };
