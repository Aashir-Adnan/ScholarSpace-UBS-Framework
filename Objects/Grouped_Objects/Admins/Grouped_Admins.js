const parameters = require('./CRUD_parameters');
        global.GroupedCrudsAdmins_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO admins (admin_type, user_role_id , created_by, updated_by) VALUES ({{admins_adminType}}, {{admins_userRoleId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE admins SET admin_type = {{admins_adminType}}, user_role_id = {{admins_userRoleId}} WHERE admin_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, admin_id as admins_id,admin_id as id, admins.admin_type as admins_adminType, admins.user_role_id as admins_userRoleId  FROM admins WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            admins.admin_id as admins_id,
                        undefined.undefined as id,
                       admins.admin_id as  admins_adminId,

                          admins.admin_id as undefined_adminId,
                          
                       
                         
                          null admins.admin_type as admins_adminType, admins.user_role_id as admins_userRoleId, 
                        undefined FROM admins  WHERE (admins.admin_id = {{id}}  AND  admins.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE admins SET status = 'inactive' WHERE admin_id = {{id}}"}    

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
                        successMessage: "admins Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsAdmins_object}