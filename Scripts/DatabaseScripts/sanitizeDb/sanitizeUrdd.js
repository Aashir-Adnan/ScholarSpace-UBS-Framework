const { projectDB } = require('../../../Database/projectDb');
const { executeQuery } = require('../../../Database/queryExecution');

async function renameUserRoleIdAndAddFK() {
  try {
    let connection = await projectDB();

    // 1. Get all tables in the DB
    const tables = await executeQuery("SHOW TABLES", [], connection, 0);
    const tableKey = Object.keys(tables[0])[0]; // e.g. "Tables_in_mydb"

    for (const row of tables) {
      const tableName = row[tableKey];

      // 2. Get all columns of this table
      const columns = await executeQuery(`SHOW COLUMNS FROM \`${tableName}\``, [], connection, 0);

      for (const col of columns) {
        let colName = col.Field;

        // ✅ Step A: Rename user_role_id → urdd_id
        if (colName === "user_role_id") {
          const newName = "urdd_id";
          console.log(`🔄 Renaming ${tableName}.${colName} -> ${newName}`);

          await executeQuery(
            `ALTER TABLE \`${tableName}\` CHANGE \`${colName}\` \`${newName}\` ${col.Type}
              ${col.Null === 'NO' ? 'NOT NULL' : ''}
              ${col.Default !== null ? 'DEFAULT ' + connection.escape(col.Default) : ''}
              ${col.Extra}`,
            [],
            connection,
            0
          );

          colName = newName; // update so we can add FK next
        }

        // ✅ Step B: If column is urdd_id, enforce FK to user_roles_designations_department
        if (colName === "urdd_id") {
          // Check if FK already exists
          const fkCheck = await executeQuery(
            `
              SELECT CONSTRAINT_NAME
              FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
              WHERE TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = ?
                AND COLUMN_NAME = ?
                AND REFERENCED_TABLE_NAME = 'user_roles_designations_department'
                AND REFERENCED_COLUMN_NAME = 'user_role_designation_department_id'
            `,
            [tableName, colName],
            connection,
            0
          );

          if (fkCheck.length === 0) {
            console.log(`🔗 Adding FK for ${tableName}.${colName} → user_roles_designations_department(user_role_designation_department_id)`);

            await executeQuery(
              `ALTER TABLE \`${tableName}\`
                ADD CONSTRAINT fk_${tableName}_${colName}
                FOREIGN KEY (\`${colName}\`)
                REFERENCES user_roles_designations_department(user_role_designation_department_id)
                ON DELETE CASCADE ON UPDATE CASCADE`,
              [],
              connection,
              0
            );
          } else {
            console.log(`ℹ️ FK already exists for ${tableName}.${colName}`);
          }
        }
      }
    }

    await connection.release();
    console.log("All user_role_id renamed to urdd_id and FKs ensured ✅");
  } catch (err) {
    console.error("Error:", err);
  }
}

renameUserRoleIdAndAddFK();

module.exports = { renameUserRoleIdAndAddFK };
