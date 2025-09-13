const otpVerif = require("../../../../Constants/otpVerif");
const { executeQuery } = require("../../../../Database/queryExecution");
const { signUpVerif } = require("../../../../UtilityFunctions/PreProcessingFunctions/signUpVerif")
async function insertEntries(req, decryptedPayload) {

    const signUpPayload = decryptedPayload["signUpVerif"];

    let user_id = (await executeQuery(`INSERT INTO users (email, username, first_name, last_name, phone_no, created_by, updated_by) VALUES ('${signUpPayload.email}', '${signUpPayload.name}', '${signUpPayload.first_name}', '${signUpPayload.last_name}', '${decryptedPayload.phone_no}', 1,1)`, [])).insertId

    let designation_id = await executeQuery(`SELECT designation_id FROM designations WHERE designation_name = 'User'`, []);
    let role_id = await executeQuery(`SELECT role_id FROM roles WHERE role_name = 'Student'`, []);
    let department_id = await executeQuery(`SELECT department_id FROM departments WHERE department_name = 'Education'`, []);
    let rdd_id = (await executeQuery(`INSERT INTO roles_designations_department (role_id, designation_id, department_id) VALUES ('${role_id}', '${designation_id}', '${department_id}')`, [])).insertId
    let urdd_id = (await executeQuery(`INSERT INTO user_roles_designations_department (user_id, role_designation_department_id) VALUES ('${user_id}', '${rdd_id}')`, [])).insertId

    return urdd_id;
}
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
                                            "name": "idToken",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "device_name",
                                            "validations": [],
                                            "required": true,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "phone_no",
                                            "required": true,
                                            "source": "req.body",
                                        },
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [signUpVerif, insertEntries],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: otpVerif
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
                    },
                    {
                        "config": {
                            "features": {
                                "multistep": true,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                // "encryption":false
                                "encryption": {
                                    "platformEncryption": true,
                                    "accessToken": false,
                                }
                            },
                            "verification": {
                                "otp": true,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "otp",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "email",
                                            "validations": ["isValidEmailFormat"],
                                            "required": true,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "device_name",
                                            "validations": [],
                                            "required": true,
                                            "source": "req.body"
                                        },
                                    ]
                            },
                            "apiInfo":
                            {
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                }
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10,
                                    "options": {
                                        "pageSizeOptions": [
                                            5,
                                            10,
                                            25,
                                            50,
                                            100,
                                            "All"
                                        ]
                                    }
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