const otpVerif = require("../../../../Constants/otpVerif");
const { executeQuery } = require("../../../../Database/queryExecution");

async function insertEntries(req, decryptedPayload) {
    let user_id = (await executeQuery(`INSERT INTO users (email, username, first_name, last_name, phone_no, password, cnic, gender  , father_name, address, date_of_birth, blood_group, religion, created_by, updated_by) VALUES ('${decryptedPayload.email}', '${decryptedPayload.username}', '${decryptedPayload.first_name}', '${decryptedPayload.last_name}', '${decryptedPayload.phone_no}', '${decryptedPayload.password}', '${decryptedPayload.cnic}', '${decryptedPayload.gender}', '${decryptedPayload.fatherName}', '${decryptedPayload.address}', '${decryptedPayload.date_of_birth}', '${decryptedPayload.blood_group}', '${decryptedPayload.religion}', 1,1)`, [])).insertId

    // return user_id;

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
                                "encryption":false
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
                                        {
                                            "name": "username",
                                            "label": "Username",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "username",
                                            "alias": "users.username",
                                        },
                                        {
                                            "name": "first_name",
                                            "label": "First Name",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "firstName",
                                            "alias": "users.first_name",
                                        },
                                        {
                                            "name": "last_name",
                                            "label": "Last Name",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "lastName",
                                            "alias": "users.last_name",
                                        },
                                        {
                                            "name": "phone_no",
                                            "label": "Phone No",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "phoneNo",
                                            "alias": "users.phone_no",
                                        },
                                        {
                                            "name": "password",
                                            "label": "Password",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "password",
                                            "alias": "users.password",
                                        },
                                        {
                                            "name": "cnic",
                                            "label": "Cnic",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "cnic",
                                            "alias": "users.cnic",
                                        },
                                        {
                                            "name": "gender",
                                            "label": "Gender",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "gender",
                                            "alias": "users.gender",
                                        },
                                        {
                                            "name": "father_name",
                                            "label": "Father Name",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "fatherName",
                                            "alias": "users.father_name",
                                        },
                                        {
                                            "name": "image_attachment_id",
                                            "label": "Image Attachment Id",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "imageAttachmentId",
                                            "alias": "users.image_attachment_id",
                                        },
                                        {
                                            "name": "address",
                                            "label": "Address",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "address",
                                            "alias": "users.address",
                                        },
                                        {
                                            "name": "date_of_birth",
                                            "label": "Date Of Birth",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "dateOfBirth",
                                            "alias": "users.date_of_birth",
                                        },
                                        {
                                            "name": "blood_group",
                                            "label": "Blood Group",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "bloodGroup",
                                            "alias": "users.blood_group",
                                        },
                                        {
                                            "name": "religion",
                                            "label": "Religion",
                                            "title": "",
                                            "type": "textField",
                                            "required": false,
                                            "hideInCreateForm": false,
                                            "visible": true,
                                            "disabled": false,
                                            "dependancyCheck": false,
                                            "isPrefilled": false,
                                            "source": "req.body",
                                            "min": "",
                                            "max": "",
                                            "selectServer": false,
                                            "dynamicKey": "religion",
                                            "alias": "users.religion",
                                        },

                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [insertEntries],
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