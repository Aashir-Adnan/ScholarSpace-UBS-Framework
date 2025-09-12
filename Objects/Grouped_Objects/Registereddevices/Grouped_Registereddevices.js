const parameters = require('./CRUD_parameters');
        global.GroupedCrudsRegistereddevices_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO registereddevices (device_name, device_token, device_type, access_token, token_expiry, device_os, make , created_by, updated_by) VALUES ({{registereddevices_deviceName}}, {{registereddevices_deviceToken}}, {{registereddevices_deviceType}}, {{registereddevices_accessToken}}, {{registereddevices_tokenExpiry}}, {{registereddevices_deviceOs}}, {{registereddevices_make}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE registereddevices SET device_name = {{registereddevices_deviceName}}, device_token = {{registereddevices_deviceToken}}, device_type = {{registereddevices_deviceType}}, access_token = {{registereddevices_accessToken}}, token_expiry = {{registereddevices_tokenExpiry}}, device_os = {{registereddevices_deviceOs}}, make = {{registereddevices_make}} WHERE device_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, device_id as registereddevices_id,device_id as id, registereddevices.device_name as registereddevices_deviceName, registereddevices.device_token as registereddevices_deviceToken, registereddevices.device_type as registereddevices_deviceType, registereddevices.access_token as registereddevices_accessToken, registereddevices.token_expiry as registereddevices_tokenExpiry, registereddevices.device_os as registereddevices_deviceOs, registereddevices.make as registereddevices_make  FROM registereddevices WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            registereddevices.device_id as registereddevices_id,
                        undefined.undefined as id,
                       registereddevices.device_id as  registereddevices_deviceId,

                          registereddevices.device_id as undefined_deviceId,
                          
                       
                         
                          null registereddevices.device_name as registereddevices_deviceName, registereddevices.device_token as registereddevices_deviceToken, registereddevices.device_type as registereddevices_deviceType, registereddevices.access_token as registereddevices_accessToken, registereddevices.token_expiry as registereddevices_tokenExpiry, registereddevices.device_os as registereddevices_deviceOs, registereddevices.make as registereddevices_make, 
                        undefined FROM registereddevices  WHERE (registereddevices.device_id = {{id}}  AND  registereddevices.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE registereddevices SET status = 'inactive' WHERE device_id = {{id}}"}    

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
                        successMessage: "registereddevices Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsRegistereddevices_object}