const { executeQuery } = require("../../../Database/queryExecution");;

async function getStudentSemesterId(req, decryptedPayload) {
  const query = `
    SELECT 
      ss.student_semester_id
    FROM
      studentsemesters ss
    WHERE
      ss.student_user_id=?
    `;
  const results = await executeQuery(res, query, [studentUserId]);
  return results
}

module.exports = getStudentSemesterId;
