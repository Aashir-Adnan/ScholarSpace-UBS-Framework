const { projectDB } = require("../../../Database/projectDb");
const { executeQuery } = require("../../../Database/queryExecution");

async function autoJoinFinder(tablesArray) {
  if (!Array.isArray(tablesArray) || tablesArray.length < 2) {
    throw new Error("You must provide an array of at least 2 tables");
  }

  let connection;
  try {
    connection = await projectDB();

    // 1. Get all foreign key relationships
    const relations = await executeQuery(
      `SELECT 
         table_name, column_name, 
         referenced_table_name, referenced_column_name
       FROM information_schema.key_column_usage
       WHERE table_schema = DATABASE()
         AND referenced_table_name IS NOT NULL
         AND table_name NOT IN ('created_by', 'updated_by')
`,
      [],
      connection,
      0
    );

    // 2. Build adjacency graph
    const graph = {};
    for (const r of relations) {
      if (!graph[r.table_name]) graph[r.table_name] = [];
      if (!graph[r.referenced_table_name]) graph[r.referenced_table_name] = [];

      graph[r.table_name].push({
        to: r.referenced_table_name,
        fromCol: r.column_name,
        toCol: r.referenced_column_name
      });

      graph[r.referenced_table_name].push({
        to: r.table_name,
        fromCol: r.referenced_column_name,
        toCol: r.column_name
      });
    }

    // 3. BFS to find join path between two tables
    function findPath(start, end) {
      let queue = [[start, []]];
      let visited = new Set();

      while (queue.length > 0) {
        let [node, path] = queue.shift();
        if (node === end) return path;

        if (visited.has(node)) continue;
        visited.add(node);

        for (let edge of graph[node] || []) {
          queue.push([edge.to, [...path, { from: node, ...edge }]]);
        }
      }
      return null;
    }

    // 4. Build full join SQL for array of tables
    let sql = `SELECT * FROM \`${tablesArray[0]}\``;

    for (let i = 0; i < tablesArray.length - 1; i++) {
      const fromTable = tablesArray[i];
      const toTable = tablesArray[i + 1];

      const path = findPath(fromTable, toTable);

      if (!path) {
        console.log(`❌ No join path found between ${fromTable} and ${toTable}`);
        continue;
      }

      for (const step of path) {
        sql += `\nJOIN \`${step.to}\` ON \`${step.from}\`.\`${step.fromCol}\` = \`${step.to}\`.\`${step.toCol}\``;
      }
    }

    console.log("✅ Auto-join SQL:\n", sql);
    return sql;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    if (connection) await connection.release();
  }
}

autoJoinFinder(["components", "courses", "enrollements", "studentsme", "users"]);

module.exports = { autoJoinFinder };
