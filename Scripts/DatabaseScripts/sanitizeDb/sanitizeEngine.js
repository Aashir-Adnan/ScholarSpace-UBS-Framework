const { projectDB } = require("../../../Database/projectDb");
const { executeQuery } = require("../../../Database/queryExecution");

async function shiftToInnoDB() {
  try {
    let connection = await projectDB();

    // 1. Get all tables in the DB
    const tables = await executeQuery("SHOW TABLES", [], connection, 0);
    const tableKey = Object.keys(tables[0])[0]; // e.g. "Tables_in_mydb"

    for (const row of tables) {
      const tableName = row[tableKey];

      // ✅ Step A: Ensure engine is InnoDB
      const engineCheck = await executeQuery(
        `SELECT ENGINE 
         FROM information_schema.tables 
         WHERE table_schema = DATABASE() 
           AND table_name = ?`,
        [tableName],
        connection,
        0
      );

      if (engineCheck[0].ENGINE !== "InnoDB") {
        console.log(`⚙️ Converting ${tableName} from ${engineCheck[0].ENGINE} → InnoDB`);
        await executeQuery(
          `ALTER TABLE \`${tableName}\` ENGINE=InnoDB`,
          [],
          connection,
          0
        );
      }
    }

    await connection.release();
    console.log("✅ All tables converted to InnoDB");
  } catch (err) {
    console.error("Error:", err);
  }
}

shiftToInnoDB();

module.exports = { shiftToInnoDB };
