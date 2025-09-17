global.CourseleaderboardsubcomponentsDropdown_object = {
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
                          "queryPayload": "SELECT courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as value, CONCAT_WS(' ', LEFT(courseleaderboards.leaderboard_name, 10), LEFT(classcomponent.component_name, 10), LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS label FROM courseleaderboardsubcomponents LEFT JOIN courseleaderboards ON courseleaderboardsubcomponents.course_leaderboard_id = courseleaderboards.course_leaderboard_id LEFT JOIN subcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id LEFT JOIN classcomponent ON subcomponents.component_id = classcomponent.component_id LEFT JOIN user_roles_designations_department ON subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id LEFT JOIN roles_designations_department ON user_roles_designations_department.role_designation_department_id = roles_designations_department.role_designation_department_id LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id LEFT JOIN departments ON roles_designations_department.department_id = departments.department_id where courseleaderboardsubcomponents.status!='inactive'",
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
                        permission: "dropdown_courseleaderboardsubcomponents",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "courseleaderboardsubcomponents retrieved successfully!",
                      errorMessage: "Failed to retrieve courseleaderboardsubcomponents.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { CourseleaderboardsubcomponentsDropdown_object }