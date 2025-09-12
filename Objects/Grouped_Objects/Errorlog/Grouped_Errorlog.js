const parameters = require('./CRUD_parameters');
        global.GroupedCrudsErrorlog_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO errorlog (error_message, file_name , created_by, updated_by) VALUES ({{errorlog_errorMessage}}, {{errorlog_fileName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE errorlog SET error_message = {{errorlog_errorMessage}}, file_name = {{errorlog_fileName}} WHERE error_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, error_id as errorlog_id,error_id as id, errorlog.error_message as errorlog_errorMessage, errorlog.file_name as errorlog_fileName  FROM errorlog WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            errorlog.error_id as errorlog_id,
                        undefined.undefined as id,
                       errorlog.error_id as  errorlog_errorId,

                          errorlog.error_id as undefined_errorId,
                          
                       
                         
                          null errorlog.error_message as errorlog_errorMessage, errorlog.file_name as errorlog_fileName, 
                        undefined FROM errorlog  WHERE (errorlog.error_id = {{id}}  AND  errorlog.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE errorlog SET status = 'inactive' WHERE error_id = {{id}}"}    

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
                        successMessage: "errorlog Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsErrorlog_object}