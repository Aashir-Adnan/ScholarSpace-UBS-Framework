const { executeQuery } = require("../../../Database/queryExecution");;  


async function getTAData(req, decryptedPayload){
    const query = `
    SELECT
        teachers_users.first_name AS teacher_name,
        assistants_users.first_name AS assistant_name,
        teachers.employee_id AS teacher_id,
        assistants.employee_id AS assistant_id,
        pc.course_name,
        pc.planned_course_id,
        pc.credit_hours,
        c.status,
        c.course_id
    FROM
        courses c
    JOIN
        plannedcourses pc ON c.planned_course_id = pc.planned_course_id
    LEFT JOIN
        employees AS teachers ON c.teacher_employee_id = teachers.employee_id
    LEFT JOIN
        employees AS assistants ON c.tassist_employee_id = assistants.employee_id
    LEFT JOIN
        user_roles_designations_department AS teacher_roles 
            ON teachers.urdd_id = teacher_roles.user_role_designation_department_id
    LEFT JOIN
        users AS teachers_users ON teacher_roles.user_id = teachers_users.user_id
    LEFT JOIN
        user_roles_designations_department AS assistant_roles 
            ON assistants.urdd_id = assistant_roles.user_role_designation_department_id
    LEFT JOIN
        users AS assistants_users ON assistant_roles.user_id = assistants_users.user_id
    WHERE
        c.status = 'active' 
        AND assistants_users.user_id = ?

`;
 
    const results = await executeQuery(res, query,[decryptedPayload.urdd_id]);
    return results
};
module.exports = getTAData;
     