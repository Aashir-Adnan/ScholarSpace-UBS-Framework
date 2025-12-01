global.Groupmembers_object = {
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
                                        "queryPayload": async(req, decryptedPayload) => {
                                            const { GroupName,CourseId } = decryptedPayload; 
                                            return `
                                                  SELECT 
                                                    u.FName AS Student_Name,
                                                    en.Status,
                                                    s.RegNum
                                                FROM
                                                    enrollements en
                                                LEFT JOIN
                                                    studentsemesters ss ON ss.StudentSemesterId = en.StudentSemesterId
                                                LEFT JOIN 
                                                    students s ON s.StudentUserId = ss.StudentUserId
                                                LEFT JOIN
                                                    userroles ur ON ur.UserRoleId = s.UserRoleId
                                                LEFT JOIN 
                                                    users u ON u.UserId = ur.UserId
                                                WHERE en.Status = "Approved" AND en.GroupName = '${GroupName}' AND en.CourseId = '${CourseId}';
                                            `   
                                        },
                                        "database": "projectDB"
                                    },
                                    "postProcessFunction":null,
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

module.exports = { Groupmembers_object };
