const executeQueryWithPagination = require("../Database/executeQueryWithPagination.js");
const { executeQuery } = require("../Database/queryExecution.js");
const getPaginationParams = require("../Constants/getPaginationParams.js");
const getDateTime = require("../Constants/getDateTime.js");
const { projectDB } = require("../Database/projectDb.js");
const { securityDB } = require("../Database/securityDB.js")
const dbConnections = {
  securitydb: securityDB,
  projectdb: projectDB,
};

function extractTableAliases(query) {
  const tableAliasMap = {};
  const tableRegex =
    /\b(?:FROM|JOIN)\s+([^\s]+)(?:\s+AS\s+([^\s]+)|\s+([^\s]+))?/gi;
  let match;

  while ((match = tableRegex.exec(query)) !== null) {
    console.log("MATCH : ", match)
    const tableName = match[1];
    const alias = (match[2] != 'JOIN' && match[2] != 'ON') ? match[2] || tableName : tableName;
    tableAliasMap[tableName] =
      alias?.toLowerCase() !== "where" ? alias : tableName;
  }
  return tableAliasMap;
}

const objectResolver = async (
  req,
  decryptedPayload,
  apiObject,
  permissionObject
) => {
  try {
    const { page, limit } = getPaginationParams(req);
    const [CreatedAtDate, CreatedAtTime] = getDateTime();
    const [UpdatedAtDate, UpdatedAtTime] = [CreatedAtDate, CreatedAtTime];
    const createdAt = CreatedAtDate + CreatedAtTime;
    const updatedAt = createdAt;

    let { queryPayload } = apiObject.data.apiInfo.query;

    if (typeof queryPayload === "function") {
      queryPayload = await queryPayload(req, decryptedPayload);
    }
    if (!queryPayload) {
      return;
    }
    console.log("Object Resolver || Query Payload: ", queryPayload, typeof queryPayload)
    const { queryNature } = apiObject.data.apiInfo.query;

    let paramValues = {};
    let results;
    let completeQuery = queryPayload;
    let fields = apiObject?.data?.parameters?.fields;
    let total_count = 0;

    if (fields != undefined) {
      if (Array.isArray(fields[0])) {
        fields = fields[0];
      }

      for (const field of fields) {
        let source = field.source; 
        const name = field.name;
        if (
          source === "req.body" ||
          source === "req.headers" ||
          source == undefined
        ) {
          paramValues[name] = decryptedPayload[name] || paramValues[name];
        } else if (source === "req.query") {
          paramValues[name] = req.query[name] || paramValues[name];
        }
      }

      if (permissionObject) {
        console.log(
          "OBJECT RESOLVER || permission object:  ",
          permissionObject
        );
        const hasWhereClause = /\bWHERE\b/i.test(completeQuery);
        if (!hasWhereClause) {
          completeQuery += " WHERE ( 1=1";
        }

        Object.keys(permissionObject.included).forEach((key) => {
          const values = permissionObject.included[key];
          completeQuery += ` AND ${key} IN (${values?.join(",")})`;
        });

        Object.keys(permissionObject.excluded || {}).forEach((key) => {
          const values = permissionObject.excluded[key];
          completeQuery += ` AND ${key} NOT IN (${values?.join(",")})`;
        });

        if (permissionObject.meta) {
          const values = permissionObject.meta.created_by
          const tableAliases = extractTableAliases(completeQuery);

          let conditions = [];

          Object.values(tableAliases).forEach((alias) => {
            conditions.push(`${alias}.created_by IN (${values})`);
          });

          if (conditions.length > 0) {
            completeQuery += ` OR (${conditions.join(" OR ")})`;
          }
          console.log("OBJECT RESOLVER || conditions: ", conditions);
        }

      }

  
      const arrayKey = Object.keys(decryptedPayload).find((key) =>
        Array.isArray(decryptedPayload[key])
      );

      if (
        decryptedPayload[arrayKey] &&
        typeof decryptedPayload[arrayKey][0] != "object" &&
        decryptedPayload[arrayKey].length > 0 
      ) {
        // *Condition 1: Key is an array of values*
        const arrayValues = decryptedPayload[arrayKey];
        results = [];
        if (arrayValues.length == 0)
          throw new Error("Empty Array Of Data Provided");
        for (const value of arrayValues) {
          // Replace the array key with the current value
          paramValues[arrayKey] = value;
          const query = replaceNestedPlaceholders(completeQuery, paramValues);
          const databaseName = getConnectionDbName(
            apiObject.data.apiInfo.query.database
          );
          console.log("DATABASE NAME IN ARRAYS: ", databaseName);
          const connection = await dbConnections[databaseName]();

          if (apiObject.config.features.pagination) {
            const paginatedResult = await executeQueryWithPagination(
              req,
              
              query,
              "",
              connection,
              page,
              limit,
              apiObject.data.columnMapper
            );
            results.push(paginatedResult);
          } else {
            const queryResult = await executeQuery(
              query,
              "",
              connection,
              false
            );
            results.push(queryResult);
          }
          connection.release()
        }
      } else {
        // *Condition 2: Key is an array of objects*
        const objectArrayKey = Object.keys(decryptedPayload).find(
          (key) =>
            Array.isArray(decryptedPayload[key]) &&
            typeof decryptedPayload[key][0] === "object"
        );
        if (objectArrayKey) {
          const objectArray = decryptedPayload[objectArrayKey];
          console.log(
            "CHECKING ARRAY OF OBJECTS",
            decryptedPayload[objectArrayKey]
          );
          results = [];

          for (const obj of objectArray) {
            // Treat obj as the decryptedPayload for this iteration

            let currentParamValues = {};
            for (const field of fields) {
              const name = field.name;
              if (obj[name] !== undefined || decryptedPayload[name]) {
                currentParamValues[name] =
                  obj[name] || decryptedPayload[name] || req.query[name] || null;
              } else if (field.source === "req.query") {
                currentParamValues[name] =
                  obj[name] || decryptedPayload[name] || req.query[name] || null;
              }
            }

            const query = replaceNestedPlaceholders(
              completeQuery,
              currentParamValues
            );
            const databaseName = getConnectionDbName(
              apiObject.data.apiInfo.query.database
            );
            console.log("DATABASE NAME IN ARRAY OF OBJECTS: ", databaseName);
            const connection = await dbConnections[databaseName]();

            if (apiObject.config.features.pagination) {
              const paginatedResult = await executeQueryWithPagination(
                req,
                
                query,
                "",
                connection,
                page,
                limit,
                apiObject.data.columnMapper
              );
              results.push(paginatedResult);
            } else {
              const queryResult = await executeQuery(
                
                query,
                "",
                connection,
                false
              );
              results.push(queryResult);
            }
            connection.release()
          }
        } else {
          // If no array key, proceed with the normal flow
          completeQuery = replaceNestedPlaceholders(completeQuery, paramValues);
          completeQuery = completeQuery
            .replace(/{{CreatedAtDate}}/g, `${CreatedAtDate}`)
            .replace(/{{CreatedAtTime}}/g, `${CreatedAtTime}`)
            .replace(/{{UpdatedAtDate}}/g, `${UpdatedAtDate}`)
            .replace(/{{UpdatedAtTime}}/g, `${UpdatedAtTime}`)
            .replace(/{{createdAt}}/g, `${createdAt}`)
            .replace(/{{updatedAt}}/g, `${updatedAt}`);

          const databaseName = getConnectionDbName(
            apiObject.data.apiInfo.query.database
          );
          console.log(
            "DATQABASE IN OBJECT",
            apiObject.data.apiInfo.query.database
          );
          console.log("DATABASE NAME IN BASE CASE: ", databaseName);
          const connection = await dbConnections[databaseName]();

          if (apiObject.config.features.pagination) {
            results = await executeQueryWithPagination(
              req,
              
              completeQuery,
              "",
              connection,
              page,
              limit,
              apiObject.data.columnMapper
            );
          } else {
            results = await executeQuery(
              completeQuery,
              "",
              connection,
              false
            );
          }
          connection.release()
        }
      }
    }
    else {
      const databaseName = getConnectionDbName(
        apiObject.data.apiInfo.query.database
      );
      const connection = await dbConnections[databaseName]();
      if (apiObject.config.features.pagination) {
        const paginatedResult = await executeQueryWithPagination(
          req,
          queryPayload,
          "",
          connection,
          page,
          limit,
          apiObject.data.columnMapper
        );
        results = paginatedResult;
      } else {
        const queryResult = await executeQuery(
          queryPayload,
          "",
          connection,
          false
        );
        results = queryResult;
      }
      connection.release()
    }

    const response = {
      results,
      total_count,
    };

    return response;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};
const replaceNestedPlaceholders = (query, params) => {
  return query.replace(/{{(.*?)}}/g, (match, key) => {
    const keys = key.split("."); // Split by dot for nested properties
    let value = params;
    // Navigate through the object based on the keys
    for (const k of keys) {
      if (
        typeof value[k] === "string" &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value[k])
      ) {
        // Split the string to format it into SQL DATETIME
        const [date, time] = value[k].split("T");
        const formattedTime = time.split(".")[0]; // Remove milliseconds
        value[k] = `${date} ${formattedTime}`;
      }

      if (value[k] !== undefined) {
        value = value[k];
      } else {
        return "NULL"; // Replace unresolved placeholders with NULL
      }
    }

    // Format the value, wrapping strings in quotes
    if (typeof value === "string") {
      return `'${value}'`; // Wrap string values in quotes
    } else if (value instanceof Date) {
      // Convert to SQL DATETIME format
      return `'${value.toISOString().split("T")[0]} ${
        value.toISOString().split("T")[1].split(".")[0]
      }'`;
    }
    return value; // Return other types (like numbers) as they are
  });
};
function getConnectionDbName(databaseName) {
  switch (databaseName) {
    case "securitydb":
      return "securitydb";
    case "mainDb":
      return "projectdb";
    default:
      return "projectdb";
  }
}

module.exports = objectResolver;
