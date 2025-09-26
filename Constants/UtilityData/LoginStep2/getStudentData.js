
const { executeQuery } = require("../../../Database/queryExecution");
async function getStudentData(req, decryptedPayload) {
  const query = `
    SELECT 
        en.enrollement_id,
        en.student_semester_id,
        en.grade,
        en.enrolled_date,
        en.group_name,
        CONCAT(u.first_name, ' ', u.last_name) AS student_name,
        p.program_name,
        p.program_year,
        d.department_name,
        en.course_id,
        pc.course_name,
        e_teacher.employee_id AS teacher_id,
        c.course_id,
        (SELECT COUNT(*) 
        FROM enrollements en_sub 
        WHERE en_sub.course_id = en.course_id 
            AND en_sub.status = 'active') AS student_count,
        CONCAT(u_teacher.first_name, ' ', u_teacher.last_name) AS teacher_name,
        u_teacher.email AS teacher_mail,
        CONCAT(u_ta.first_name, ' ', u_ta.last_name) AS assistant_name,
        u_ta.email AS ta_mail,
        en.status
        FROM
        enrollements en
        LEFT JOIN
        studentsemesters ss ON ss.student_semester_id = en.student_semester_id
        LEFT JOIN
        semesters s ON ss.semester_id = s.semester_id
        LEFT JOIN
        programs p ON s.program_id = p.program_id
        LEFT JOIN
        departments d ON p.department_id = d.department_id  
        LEFT JOIN
        students stu ON stu.student_user_id = ss.student_user_id
        LEFT JOIN
        user_roles_designations_department ur ON ur.user_role_designation_department_id = stu.urdd_id
        LEFT JOIN 
        users u ON u.user_id = ur.user_id
        LEFT JOIN 
        courses c ON c.course_id = en.course_id
        LEFT JOIN 
        employees e_teacher ON c.teacher_employee_id = e_teacher.employee_id
        LEFT JOIN 
        user_roles_designations_department ur_teacher ON ur_teacher.user_role_designation_department_id = e_teacher.urdd_id
        LEFT JOIN 
        users u_teacher ON ur_teacher.user_id = u_teacher.user_id
        LEFT JOIN 
        employees e_ta ON c.tassist_employee_id = e_ta.employee_id
        LEFT JOIN 
        user_roles_designations_department ur_ta ON ur_ta.user_role_designation_department_id = e_ta.urdd_id
        LEFT JOIN 
        users u_ta ON ur_ta.user_id = u_ta.user_id
        LEFT JOIN
        plannedcourses pc ON pc.planned_course_id = c.planned_course_id
        WHERE
        en.status = 'approved' 
        AND stu.urdd_id = ?
        GROUP BY
        en.course_id,
        pc.course_name,
        u_teacher.first_name, u_teacher.last_name,
        u_teacher.email,
        u_ta.first_name, u_ta.last_name,
        u_ta.email
        ORDER BY
        pc.course_name;

`;
  const results = await executeQuery(query,[decryptedPayload.urddId]); 
  return results
}

module.exports = getStudentData;
