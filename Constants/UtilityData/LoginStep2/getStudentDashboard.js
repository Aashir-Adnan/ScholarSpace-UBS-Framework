const { executeQuery } = require('../../../Database/queryExecution');

async function handleGeStudentDashboardRequestRequest(req, decryptedPayload) {
const query = `
    SELECT 
        pc.course_name,
        c.course_id,
        sc.end_time,
        CONCAT(cc.component_name, ' ', sc.sub_component_num) AS subcomponent_name,
        DATE(MIN(sc.date)) AS earliest_upcoming_deadline
    FROM
        courses c
    LEFT JOIN
        classcomponent cc ON c.course_id = cc.course_id
    LEFT JOIN
        subcomponents sc ON cc.component_id = sc.component_id
    LEFT JOIN 
        plannedcourses pc ON pc.planned_course_id = c.planned_course_id
    LEFT JOIN
        enrollements e ON e.course_id = c.course_id
    LEFT JOIN
        studentsemesters ss ON ss.student_semester_id = e.student_semester_id
    LEFT JOIN 
        students s ON s.student_user_id = ss.student_user_id
    LEFT JOIN
        user_roles_designations_department ur ON ur.user_role_designation_department_id = s.urdd_id
    LEFT JOIN
        users u ON u.user_id = ur.user_id
    WHERE
        sc.date > CURRENT_DATE 
        AND u.user_id = ?
        AND sc.status = 'active'
`; 
    const results = await executeQuery(res, query, [decryptedPayload.user_id]);
    // console.log("results",results)
    return results

};
module.exports = handleGeStudentDashboardRequestRequest;