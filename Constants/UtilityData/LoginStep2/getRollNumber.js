const { executeQuery } = require("../../../Database/queryExecution");;

async function getRollNumber(req, decryptedPayload) {
  const query = `
    SELECT 
      s.reg_num
    FROM
      students s
    WHERE
      s.urdd_id=?
    `;
  const results = await executeQuery( res,query,[decryptedPayload.urdd_id]); 
  return results
}

module.exports = getRollNumber;
