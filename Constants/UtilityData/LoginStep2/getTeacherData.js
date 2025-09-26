const { executeQuery } = require("../../../Database/queryExecution");;  


async function getTeacherData(req, decryptedPayload){
    const query = `
    SELECT
        teachers_users.first_name AS teacher_name,
        assistants_users.first_name AS assistant_name,
        teachers.employee_id AS teacher_id,
        assistants.employee_id AS assistant_id,
        p.program_name,
        p.program_year,
        s.semester_num,
        d.department_name,
        pc.course_name,
        pc.planned_course_id,
        pc.credit_hours,
        c.status,
        c.course_id,
        COUNT(en.course_id) AS enrollment_count
    FROM
        courses c
    JOIN
        plannedcourses pc ON c.planned_course_id = pc.planned_course_id
    LEFT JOIN
        semesters s ON pc.semester_id = s.semester_id
    LEFT JOIN
        programs p ON s.program_id = p.program_id
    LEFT JOIN
        departments d ON d.department_id = p.department_id    
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
    LEFT JOIN
        enrollements en ON c.course_id = en.course_id 
        AND en.status = 'approved'
    WHERE
        c.teacher_employee_id = teachers.employee_id
        AND c.status = 'active'
        AND teachers.urdd_id = ?
    GROUP BY
        teacher_name,
        assistant_name,
        teacher_id,
        assistant_id,
        p.program_name,
        d.department_name,
        s.semester_num,
        pc.course_name,
        pc.planned_course_id,
        pc.credit_hours,
        c.status,
        c.course_id

    `;
 
    const results = await executeQuery(res, query,[decryptedPayload.urdd_id]);
    return results
};
module.exports = getTeacherData;
    