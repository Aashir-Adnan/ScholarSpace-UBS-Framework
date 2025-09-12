/* CRUD Objects for table: subcomponents */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSubcomponents_object = {
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
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, user_role_id, date, start_time, end_time, total_marks, weightage, is_public, created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_userRoleId}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, user_role_id = {{subcomponents_userRoleId}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}} WHERE sub_component_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, subcomponents.sub_component_id as subcomponents_id, subcomponents.sub_component_id as id, subcomponents.sub_component_id as subcomponents_subComponentId,subcomponents.component_id as subcomponents_componentId,subcomponents.sub_component_num as subcomponents_subComponentNum,subcomponents.text as subcomponents_text,subcomponents.user_role_id as subcomponents_userRoleId,subcomponents.date as subcomponents_date,subcomponents.start_time as subcomponents_startTime,subcomponents.end_time as subcomponents_endTime,subcomponents.total_marks as subcomponents_totalMarks,subcomponents.weightage as subcomponents_weightage,subcomponents.is_public as subcomponents_isPublic FROM subcomponents  Where subcomponents.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT subcomponents.sub_component_id as subcomponents_id, subcomponents.sub_component_id as id, subcomponents.sub_component_id as subcomponents_subComponentId,subcomponents.component_id as subcomponents_componentId,subcomponents.sub_component_num as subcomponents_subComponentNum,subcomponents.text as subcomponents_text,subcomponents.user_role_id as subcomponents_userRoleId,subcomponents.date as subcomponents_date,subcomponents.start_time as subcomponents_startTime,subcomponents.end_time as subcomponents_endTime,subcomponents.total_marks as subcomponents_totalMarks,subcomponents.weightage as subcomponents_weightage,subcomponents.is_public as subcomponents_isPublic FROM subcomponents  WHERE sub_component_id = {{id}} OR sub_component_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE subcomponents SET status = 'inactive' WHERE sub_component_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_subcomponents", View: "view_subcomponents", Update: "update_subcomponents", Delete: "delete_subcomponents", List: "list_subcomponents" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Subcomponents CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Subcomponents.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSubcomponents_object}