const { executeQuery } = require('../../../Database/queryExecution');

require('dotenv').config();
async function getCourseSubDomain(req, decryptedPayload) {
    try {
        let currentUrl = req.headers.origin || decryptedPayload.currentUrl;
        if (currentUrl) {
            if (!currentUrl.includes(process.env.REACT_BASE_URL)) {
                const query =
                    `
                SELECT 
                    c.CourseId,
                    pc.CourseName,
                    c.CourseSubDomainPrefix,
                    e.employee_id,
                    e.PersonalDomainUrl
                FROM
                    courses c 
                LEFT JOIN 
                    plannedcourses pc ON c.PlannedCourseId = pc.PlannedCourseId 
                LEFT JOIN 
                    employees e ON c.TeacherEmployeeId = e.employee_id 
                LEFT JOIN 
                    userroles ur ON e.urdd_id = ur.urdd_id 
                LEFT JOIN 
                    users u ON ur.user_id = u.user_id 
                WHERE 
                    c.CourseSubDomainPrefix LIKE CONCAT('%', e.PersonalDomainUrl, '%');
        `
                const results = await executeQuery(res, query, [decryptedPayload.urdd_id]);
                const extractHostname = (currentUrl) => {
                    const urlObj = new URL(currentUrl);
                    return urlObj.hostname;
                };


                const currentHostname = extractHostname(currentUrl);
                console.log("currentHostname:::", currentHostname)
                const matchingCourses = results.filter(course =>
                    course.CourseSubDomainPrefix.includes(currentHostname)
                );

                console.log("matchingCourses::", matchingCourses)
                return matchingCourses
            }
        }
        return
    } catch (error) {
        console.log("Error:", error)
    }
}

module.exports = getCourseSubDomain;
