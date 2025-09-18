const { executeQuery } = require("../../../Database/queryExecution"); 
require("dotenv").config();
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function shorten(str, len = 10) {
  if (str == null) return "";
  return str.length > len ? str.slice(0, len - 3) + "..." : str;
}

// ask a question and return promise
function ask(question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())));
}

(async () => {
  let query = `
    SELECT TABLE_NAME
    FROM information_schema.tables
    WHERE table_schema = '${process.env.DB_DATABASE}'
  `;
  let tables = await executeQuery(query, []);

  for (let t of tables) {
    console.clear();
    console.log(`\n📂 TABLE: ${t.TABLE_NAME}\n`);

    let data = await executeQuery(
      `
      SELECT 
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
      WHERE c.TABLE_SCHEMA = '${process.env.DB_DATABASE}'
        AND c.TABLE_NAME = '${t.TABLE_NAME}'
      ORDER BY c.ORDINAL_POSITION ASC
      `,
      []
    );

    const rows = data.map((row) => ({
      COLUMN_NAME: row.COLUMN_NAME,
      KEY: row.COLUMN_KEY,
      NULLABLE: row.IS_NULLABLE,
      TYPE: shorten(row.COLUMN_TYPE, 10),
      REF_TABLE: shorten(row.REFERENCED_TABLE_NAME, 10),
      REF_COL: shorten(row.REFERENCED_COLUMN_NAME, 10),
      CONSTRAINT: shorten(row.CONSTRAINT_NAME, 10),
    }));
    console.table(rows);

    let done = false;
    while (!done) {
      const input = await ask(
        "👉 Enter FK as: <col> <ref_table> <ref_col>, or just press ENTER to move on:\n   > "
      );

      if (!input) {
        // ENTER → move to next table
        done = true;

      } else {
        const [col, refTable, refCol] = input.split(/\s+/);

        if (!col || !refTable || !refCol) {
          console.log("⚠️ Invalid input. Please provide exactly 3 values separated by spaces.");
        } else {
          // add the foreign key
          let alterQuery = `
            ALTER TABLE \`${t.TABLE_NAME}\`
            ADD CONSTRAINT fk_${t.TABLE_NAME}_${col}
            FOREIGN KEY (\`${col}\`)
            REFERENCES \`${refTable}\` (\`${refCol}\`);
          `;
          await executeQuery(alterQuery, []);

          // refresh the schema display
          console.clear();
          console.log(`\n📂 TABLE: ${t.TABLE_NAME}\n`);

          let data = await executeQuery(
            `
            SELECT 
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
            WHERE c.TABLE_SCHEMA = '${process.env.DB_DATABASE}'
              AND c.TABLE_NAME = '${t.TABLE_NAME}'
            ORDER BY c.ORDINAL_POSITION ASC
            `,
            []
          );

          const rows = data.map((row) => ({
            COLUMN_NAME: row.COLUMN_NAME,
            KEY: row.COLUMN_KEY,
            NULLABLE: row.IS_NULLABLE,
            TYPE: shorten(row.COLUMN_TYPE, 10),
            REF_TABLE: shorten(row.REFERENCED_TABLE_NAME, 10),
            REF_COL: shorten(row.REFERENCED_COLUMN_NAME, 10),
            CONSTRAINT: shorten(row.CONSTRAINT_NAME, 10),
          }));
          console.table(rows);
        }
      }
    }

  }

  rl.close();
})();
