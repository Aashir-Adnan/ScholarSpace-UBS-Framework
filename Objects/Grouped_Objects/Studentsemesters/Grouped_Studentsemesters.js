const parameters = require('./CRUD_parameters');
        global.GroupedCrudsStudentsemesters_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO studentsemesters (student_user_id, semester_id , created_by, updated_by) VALUES ({{studentsemesters_studentUserId}}, {{studentsemesters_semesterId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE studentsemesters SET student_user_id = {{studentsemesters_studentUserId}}, semester_id = {{studentsemesters_semesterId}}, created_by = {{studentsemesters_createdBy}}, updated_by = {{studentsemesters_updatedBy}} WHERE student_semester_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, student_semester_id as studentsemesters_id,student_semester_id as id, studentsemesters.student_user_id as studentsemesters_studentUserId, studentsemesters.semester_id as studentsemesters_semesterId  FROM studentsemesters WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            studentsemesters.student_semester_id as studentsemesters_id,
                        undefined.undefined as id,
                       studentsemesters.student_semester_id as  studentsemesters_studentSemesterId,

                          studentsemesters.student_semester_id as undefined_studentSemesterId,
                          
                       
                         
                          null studentsemesters.student_user_id as studentsemesters_studentUserId, studentsemesters.semester_id as studentsemesters_semesterId, 
                        undefined FROM studentsemesters  WHERE (studentsemesters.student_semester_id = {{id}}  AND  studentsemesters.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE studentsemesters SET status = 'inactive' WHERE student_semester_id = {{id}}"}    

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
                        successMessage: "studentsemesters Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsStudentsemesters_object}