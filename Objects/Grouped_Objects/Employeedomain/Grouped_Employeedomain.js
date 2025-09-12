const parameters = require('./CRUD_parameters');
        global.GroupedCrudsEmployeedomain_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO employeedomain (employee_id, domain_id , created_by, updated_by) VALUES ({{employeedomain_employeeId}}, {{employeedomain_domainId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE employeedomain SET employee_id = {{employeedomain_employeeId}}, domain_id = {{employeedomain_domainId}} WHERE employee_domain_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employee_domain_id as employeedomain_id,employee_domain_id as id, employeedomain.employee_id as employeedomain_employeeId, employeedomain.domain_id as employeedomain_domainId  FROM employeedomain WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employeedomain.employee_domain_id as employeedomain_id,
                        undefined.undefined as id,
                       employeedomain.employee_domain_id as  employeedomain_employeeDomainId,

                          employeedomain.employee_domain_id as undefined_employeeDomainId,
                          
                       
                         
                          null employeedomain.employee_id as employeedomain_employeeId, employeedomain.domain_id as employeedomain_domainId, 
                        undefined FROM employeedomain  WHERE (employeedomain.employee_domain_id = {{id}}  AND  employeedomain.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE employeedomain SET status = 'inactive' WHERE employee_domain_id = {{id}}"}    

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
                        successMessage: "employeedomain Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsEmployeedomain_object}