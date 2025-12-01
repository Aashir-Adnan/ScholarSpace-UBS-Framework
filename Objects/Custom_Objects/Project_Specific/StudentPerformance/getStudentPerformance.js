global.getCourseLeaderboard_object = {
    "versions": {
        "versionData": [
            {
                "*": {
                    "steps": [
                        {
                            "config": {
                                "features": {
                                    "multistep": false,
                                    "parameters": true,
                                    "pagination": false,
                                },
                                "communication": {
                                    "encryption": false
                                },
                                "verification": {
                                    "otp": false,
                                    "accessToken": false
                                }
                            },
                            "data": {
                                "parameters": {
                                    "fields": []
                                },
                                "apiInfo": {
                                    "preProcessFunction": [],
                                    "query": {
                                        "queryNature": "single-step",
                                        "queryPayload": async(req, decryptedPayload) => {
                                            const enrollementId = req.query.enrollementId;
                                            const courseId = req.query.courseId;   
                                            return `
                                                SELECT
                                                    s.RegNum,
                                                    u.FName AS StudentName,
                                                    cc.ComponentName,
                                                    sc.SubComponentID,
                                                    sc.SubComponentNum,
                                                    sc.TotalMarks AS SubComponentTotalMarks,
                                                    COALESCE(scm.ObtainedMarks, 0) AS SubComponentObtainedMarks,
                                                    sc.createdAt AS SubComponentCreatedAt,
                                                    cc.Weightage,
                                                    cc.ComponentPolicy
                                                FROM
                                                    enrollements e
                                                LEFT JOIN
                                                    courses c ON c.CourseId = e.CourseId
                                                LEFT JOIN
                                                    studentsemesters ss ON ss.StudentSemesterId = e.StudentSemesterId
                                                LEFT JOIN
                                                    students s ON s.StudentUserId = ss.StudentUserId
                                                LEFT JOIN
                                                    userroles ur ON ur.UserRoleId = s.UserRoleId
                                                LEFT JOIN
                                                    users u ON ur.UserId = u.UserId
                                                LEFT JOIN
                                                    classcomponent cc ON cc.CourseId = c.CourseId
                                                LEFT JOIN
                                                    subComponents sc ON sc.ComponentID = cc.ComponentID
                                                LEFT JOIN
                                                    subcomponentmarks scm ON scm.SubComponentId = sc.SubComponentId AND scm.EnrollmentId = e.EnrollementId
                                                WHERE
                                                    c.CourseId = '${courseId}' AND e.EnrollementId = '${enrollementId}' AND cc.ComponentType = 'Graded' AND sc.Status = 'Active'
                                                ORDER BY
                                                    cc.ComponentID, sc.SubComponentNum;
                                            `   
                                        },
                                        "database": "projectDB"
                                    },
                                    "postProcessFunction":null,
                                    "utilityFunctions": {
                                        "callbackFunction": null,
                                        "payloadFunction": []
                                    },
                                },
                                "requestMetaData": {
                                    "requestMethod": "GET",
                                    "permission": null,
                                    "pagination": {
                                        "pageSize": 10
                                    }
                                }
                            },
                            "response": {
                                "successMessage": "Leaderboards retrieved successfully!",
                                "errorMessage": "There was an error retrieving leaderboards."
                            }
                        }
                    ]
                },
            }
        ]
    }
};

module.exports = { getCourseLeaderboard_object };
