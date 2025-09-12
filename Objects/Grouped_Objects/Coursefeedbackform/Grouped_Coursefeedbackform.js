const parameters = require('./CRUD_parameters');
        global.GroupedCrudsCoursefeedbackform_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO coursefeedbackform (course_id, feedback_form_id , created_by, updated_by) VALUES ({{coursefeedbackform_courseId}}, {{coursefeedbackform_feedbackFormId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE coursefeedbackform SET course_id = {{coursefeedbackform_courseId}}, feedback_form_id = {{coursefeedbackform_feedbackFormId}} WHERE course_feed_back_form_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_feed_back_form_id as coursefeedbackform_id,course_feed_back_form_id as id, coursefeedbackform.course_id as coursefeedbackform_courseId, coursefeedbackform.feedback_form_id as coursefeedbackform_feedbackFormId  FROM coursefeedbackform WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            coursefeedbackform.course_feed_back_form_id as coursefeedbackform_id,
                        undefined.undefined as id,
                       coursefeedbackform.course_feed_back_form_id as  coursefeedbackform_courseFeedBackFormId,

                          coursefeedbackform.course_feed_back_form_id as undefined_courseFeedBackFormId,
                          
                       
                         
                          null coursefeedbackform.course_id as coursefeedbackform_courseId, coursefeedbackform.feedback_form_id as coursefeedbackform_feedbackFormId, 
                        undefined FROM coursefeedbackform  WHERE (coursefeedbackform.course_feed_back_form_id = {{id}}  AND  coursefeedbackform.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE coursefeedbackform SET status = 'inactive' WHERE course_feed_back_form_id = {{id}}"}    

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
                        successMessage: "coursefeedbackform Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsCoursefeedbackform_object}