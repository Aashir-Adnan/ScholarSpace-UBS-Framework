const { projectDB } = require('../../../Database/projectDb');
const { executeQuery } = require('../../../Database/queryExecution');

function camelToSnake(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

async function sanitizeNames() {
  try {
    let connection = await projectDB();
    // 1. Get all tables
    const tables = await executeQuery("SHOW TABLES", [], connection, 0);
    const tableKey = Object.keys(tables[0])[0]; // e.g. 'Tables_in_mydb'

    for (const row of tables) {
      const tableName = row[tableKey];

      // 2. Get all columns of this table
      const columns = await executeQuery(`SHOW COLUMNS FROM \`${tableName}\``, [], connection, 0);

      for (const col of columns) {
        const oldName = col.Field;
        const newName = camelToSnake(oldName);

        if (oldName !== newName) {
          console.log(`Renaming ${tableName}.${oldName} -> ${newName}`);

          // 3. Rename column
          await executeQuery(
            `ALTER TABLE \`${tableName}\` CHANGE \`${oldName}\` \`${newName}\` ${col.Type}
              ${col.Null === 'NO' ? 'NOT NULL' : ''}
              ${col.Default !== null ? 'DEFAULT ' + connection.escape(col.Default) : ''}
              ${col.Extra}`,
            [],
            connection,
            0
          );

          // 4. Handle constraints (FKs, PKs, Indexes)
          //    MySQL auto-renames constraints with column rename in many cases,
          //    but if you want strict snake_case names for keys too, you need:
          //    - Drop old constraint/index
          //    - Recreate with snake_case name
          //
          // Example (foreign keys):
          // const constraints = await executeQuery(`
          //   SELECT CONSTRAINT_NAME
          //   FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
          //   WHERE TABLE_NAME = ? AND COLUMN_NAME = ?`, [tableName, newName], connection, 0);
          //
          // Then drop + recreate constraint with snake_case name.
        }
      }
    }
    await connection.release();

    console.log("Sanitization complete ✅");
  } catch (err) {
    console.error("Error sanitizing names:", err);
  }
}

sanitizeNames();

module.exports = { sanitizeNames };
