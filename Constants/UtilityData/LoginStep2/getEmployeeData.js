const { executeQuery } = require("../../../Database/queryExecution");;

async function getEmployeeData(req, decryptedPayload) {
  const query = `
  SELECT 
    e.employee_id
  FROM
    employees e
  WHERE
   e.urdd_id=?
    `;
  const results = await executeQuery(query,[decryptedPayload.urdd_id]); 
  return results
}

module.exports = getEmployeeData;
