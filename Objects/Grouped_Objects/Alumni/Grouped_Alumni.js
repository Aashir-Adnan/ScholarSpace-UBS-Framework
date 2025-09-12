const parameters = require('./CRUD_parameters');
        global.GroupedCrudsAlumni_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO alumni (user_role_id, graduating_year, employement_detail , created_by, updated_by) VALUES ({{alumni_userRoleId}}, {{alumni_graduatingYear}}, {{alumni_employementDetail}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE alumni SET user_role_id = {{alumni_userRoleId}}, graduating_year = {{alumni_graduatingYear}}, employement_detail = {{alumni_employementDetail}} WHERE alumni_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, alumni_id as alumni_id,alumni_id as id, alumni.user_role_id as alumni_userRoleId, alumni.graduating_year as alumni_graduatingYear, alumni.employement_detail as alumni_employementDetail  FROM alumni WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            alumni.alumni_id as alumni_id,
                        undefined.undefined as id,
                       alumni.alumni_id as  alumni_alumniId,

                          alumni.alumni_id as undefined_alumniId,
                          
                       
                         
                          null alumni.user_role_id as alumni_userRoleId, alumni.graduating_year as alumni_graduatingYear, alumni.employement_detail as alumni_employementDetail, 
                        undefined FROM alumni  WHERE (alumni.alumni_id = {{id}}  AND  alumni.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE alumni SET status = 'inactive' WHERE alumni_id = {{id}}"}    

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
                        successMessage: "alumni Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsAlumni_object}