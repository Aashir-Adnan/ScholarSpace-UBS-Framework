const { projectDB } = require('../../../Database/projectDb');
const { executeQuery } = require('../../../Database/queryExecution');

async function checkDuplicateForeignKeys() {
  try {
    let connection = await projectDB();

    // Get current database/schema name
    const [{ dbName }] = await executeQuery("SELECT DATABASE() AS dbName", [], connection, 0);

    // Query foreign key info
    const fks = await executeQuery(
      `
      SELECT 
        TABLE_NAME,
        COLUMN_NAME,
        CONSTRAINT_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ?
        AND REFERENCED_TABLE_NAME IS NOT NULL
      ORDER BY TABLE_NAME, COLUMN_NAME
      `,
      [dbName],
      connection,
      0
    );

    // Group by table+column
    const columnMap = {};
    for (const fk of fks) {
      const key = `${fk.TABLE_NAME}.${fk.COLUMN_NAME}`;
      if (!columnMap[key]) {
        columnMap[key] = [];
      }
      columnMap[key].push(fk);
    }

    // Report duplicates
    for (const [colKey, constraints] of Object.entries(columnMap)) {
      if (constraints.length > 1) {
        console.log(`⚠️ Column ${colKey} has multiple foreign keys:`);
        constraints.forEach((fk) => {
          console.log(
            `   - ${fk.CONSTRAINT_NAME} → ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME}`
          );
        });
      }
    }

    await connection.release();
    console.log("Foreign key check complete ✅");
  } catch (err) {
    console.error("Error checking foreign keys:", err);
  }
}

checkDuplicateForeignKeys();

module.exports = { checkDuplicateForeignKeys };
