const parameters = require('./CRUD_parameters');
        global.GroupedCrudsTopicquestions_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO topicquestions (lecture_topic_id, question_type, question, is_done, created_at_date, created_at_time, updated_at_date, updated_at_time , created_by, updated_by) VALUES ({{topicquestions_lectureTopicId}}, {{topicquestions_questionType}}, {{topicquestions_question}}, {{topicquestions_isDone}}, {{topicquestions_createdAtDate}}, {{topicquestions_createdAtTime}}, {{topicquestions_updatedAtDate}}, {{topicquestions_updatedAtTime}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE topicquestions SET lecture_topic_id = {{topicquestions_lectureTopicId}}, question_type = {{topicquestions_questionType}}, question = {{topicquestions_question}}, is_done = {{topicquestions_isDone}}, created_at_date = {{topicquestions_createdAtDate}}, created_at_time = {{topicquestions_createdAtTime}}, updated_at_date = {{topicquestions_updatedAtDate}}, updated_at_time = {{topicquestions_updatedAtTime}} WHERE topic_question_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, topic_question_id as topicquestions_id,topic_question_id as id, topicquestions.lecture_topic_id as topicquestions_lectureTopicId, topicquestions.question_type as topicquestions_questionType, topicquestions.question as topicquestions_question, topicquestions.is_done as topicquestions_isDone, topicquestions.created_at_date as topicquestions_createdAtDate, topicquestions.created_at_time as topicquestions_createdAtTime, topicquestions.updated_at_date as topicquestions_updatedAtDate, topicquestions.updated_at_time as topicquestions_updatedAtTime  FROM topicquestions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            topicquestions.topic_question_id as topicquestions_id,
                        undefined.undefined as id,
                       topicquestions.topic_question_id as  topicquestions_topicQuestionId,

                          topicquestions.topic_question_id as undefined_topicQuestionId,
                          
                       
                         
                          null topicquestions.lecture_topic_id as topicquestions_lectureTopicId, topicquestions.question_type as topicquestions_questionType, topicquestions.question as topicquestions_question, topicquestions.is_done as topicquestions_isDone, topicquestions.created_at_date as topicquestions_createdAtDate, topicquestions.created_at_time as topicquestions_createdAtTime, topicquestions.updated_at_date as topicquestions_updatedAtDate, topicquestions.updated_at_time as topicquestions_updatedAtTime, 
                        undefined FROM topicquestions  WHERE (topicquestions.topic_question_id = {{id}}  AND  topicquestions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE topicquestions SET status = 'inactive' WHERE topic_question_id = {{id}}"}    

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
                        successMessage: "topicquestions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsTopicquestions_object}