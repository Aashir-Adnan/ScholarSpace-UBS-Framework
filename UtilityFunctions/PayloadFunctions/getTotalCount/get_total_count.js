
const { executeQuery } = require("../../../Database/queryExecution");

async function total_count(req, completeQuery,connection){
   
    const query = `
        SELECT
            COUNT(*) as count
        FROM 
            ${await getTableName(completeQuery)}
        WHERE  status != 'inactive'
    `
   
    // const connection = await projectDB(); 
    const results = await executeQuery(query, "", connection);
    return results[0]?.count
}
function getTableName(query) {
    // Regular expression to match the table name after "FROM"
    const match = query.match(/FROM\s+(\w+)/i);
    return match ? match[1] : null; // Return the table name or null if not found
}
module.exports = total_count;