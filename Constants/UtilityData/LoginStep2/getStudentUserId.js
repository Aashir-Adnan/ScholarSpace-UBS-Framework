const { executeQuery } = require("../../../Database/queryExecution");;

async function getStudentUserId(req, decryptedPayload) {
  const query = `
    SELECT 
      s.StudentUserId
    FROM
      students s
    WHERE
      s.urdd_id=?
  `;
  const results = await executeQuery(res, query, [decryptedPayload.urdd_id]);
  return results
}

module.exports = getStudentUserId;
