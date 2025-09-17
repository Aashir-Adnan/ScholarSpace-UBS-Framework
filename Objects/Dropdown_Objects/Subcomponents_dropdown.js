global.SubcomponentsDropdown_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      { 
                        platformIP : ['*'],                     
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                              accessToken: true
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: null,
                      apiInfo: {
                      
                        preProcessFunction : [],
                        query: {
                          "queryPayload": "SELECT subcomponents.sub_component_id as value, CONCAT_WS(' ', LEFT(classcomponent.component_name, 10), LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS label FROM subcomponents LEFT JOIN classcomponent ON subcomponents.component_id = classcomponent.component_id LEFT JOIN user_roles_designations_department ON subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id LEFT JOIN roles_designations_department ON user_roles_designations_department.role_designation_department_id = roles_designations_department.role_designation_department_id LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id LEFT JOIN departments ON roles_designations_department.department_id = departments.department_id where subcomponents.status!='inactive'",
                        },
                        database: "mainDb",
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: "GET",
                        permission: "dropdown_subcomponents",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "subcomponents retrieved successfully!",
                      errorMessage: "Failed to retrieve subcomponents.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { SubcomponentsDropdown_object }