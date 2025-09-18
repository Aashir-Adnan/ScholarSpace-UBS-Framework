

global.SignUp_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": true,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": false
                                // "encryption": {
                                //     "platformEncryption": true,
                                //     //   "accessTokenEncryption": false,
                                // }
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "actionPerformerURDD",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        }
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": `
                                    SELECT c.component_id AS id, c.component_type AS type, c.component_name AS title, sc.start_time, sc.end_time, sc.text AS description, pc.course_name AS course, sc.status, sc.updated_at
                                    FROM subcomponents sc
                                    JOIN classcomponent c ON sc.component_id = c.component_id
                                    JOIN courses co ON c.course_id = co.course_id
                                    JOIN plannedcourses pc ON co.planned_course_id = pc.planned_course_id
                                    JOIN enrollements e ON c.course_id = e.course_id
                                    JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
                                    JOIN students s ON ss.student_user_id = s.student_user_id
                                    WHERE s.urdd_id = {{actionPerformerURDD}} AND sc.status = 'active'`,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: null
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Configuration generated successfully!",
                            "errorMessage": "There was an error generating the configuration."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { SignUp_object };