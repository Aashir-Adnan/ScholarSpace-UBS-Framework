const parameters = require('./CRUD_parameters');
        global.GroupedCrudsClomappingplo_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO clomappingplo (cloid, clointensity_name, ploid , created_by, updated_by) VALUES ({{clomappingplo_cloid}}, {{clomappingplo_clointensityName}}, {{clomappingplo_ploid}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE clomappingplo SET cloid = {{clomappingplo_cloid}}, clointensity_name = {{clomappingplo_clointensityName}}, ploid = {{clomappingplo_ploid}} WHERE clomapping_ploid = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, clomapping_ploid as clomappingplo_id,clomapping_ploid as id, clomappingplo.cloid as clomappingplo_cloid, clomappingplo.clointensity_name as clomappingplo_clointensityName, clomappingplo.ploid as clomappingplo_ploid  FROM clomappingplo WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            clomappingplo.clomapping_ploid as clomappingplo_id,
                        undefined.undefined as id,
                       clomappingplo.clomapping_ploid as  clomappingplo_clomappingPloid,

                          clomappingplo.clomapping_ploid as undefined_clomappingPloid,
                          
                       
                         
                          null clomappingplo.cloid as clomappingplo_cloid, clomappingplo.clointensity_name as clomappingplo_clointensityName, clomappingplo.ploid as clomappingplo_ploid, 
                        undefined FROM clomappingplo  WHERE (clomappingplo.clomapping_ploid = {{id}}  AND  clomappingplo.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE clomappingplo SET status = 'inactive' WHERE clomapping_ploid = {{id}}"}    

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
                        successMessage: "clomappingplo Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsClomappingplo_object}