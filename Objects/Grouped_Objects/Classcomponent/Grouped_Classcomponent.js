const parameters = require('./CRUD_parameters');
        global.GroupedCrudsClasscomponent_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO classcomponent (course_id, component_type, component_name, weightage, component_policy , created_by, updated_by) VALUES ({{classcomponent_courseId}}, {{classcomponent_componentType}}, {{classcomponent_componentName}}, {{classcomponent_weightage}}, {{classcomponent_componentPolicy}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE classcomponent SET course_id = {{classcomponent_courseId}}, component_type = {{classcomponent_componentType}}, component_name = {{classcomponent_componentName}}, weightage = {{classcomponent_weightage}}, component_policy = {{classcomponent_componentPolicy}} WHERE component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, component_id as classcomponent_id,component_id as id, classcomponent.course_id as classcomponent_courseId, classcomponent.component_type as classcomponent_componentType, classcomponent.component_name as classcomponent_componentName, classcomponent.weightage as classcomponent_weightage, classcomponent.component_policy as classcomponent_componentPolicy  FROM classcomponent WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            classcomponent.component_id as classcomponent_id,
                        undefined.undefined as id,
                       classcomponent.component_id as  classcomponent_componentId,

                          classcomponent.component_id as undefined_componentId,
                          
                       
                         
                          null classcomponent.course_id as classcomponent_courseId, classcomponent.component_type as classcomponent_componentType, classcomponent.component_name as classcomponent_componentName, classcomponent.weightage as classcomponent_weightage, classcomponent.component_policy as classcomponent_componentPolicy, 
                        undefined FROM classcomponent  WHERE (classcomponent.component_id = {{id}}  AND  classcomponent.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE classcomponent SET status = 'inactive' WHERE component_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "classcomponent Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsClasscomponent_object}