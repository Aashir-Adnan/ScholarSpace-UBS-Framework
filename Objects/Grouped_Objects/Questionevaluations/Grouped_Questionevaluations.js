const parameters = require('./CRUD_parameters');
        global.GroupedCrudsQuestionevaluations_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questionevaluations (enrollement_id, question_id, student_answer, obtained_marks , created_by, updated_by) VALUES ({{questionevaluations_enrollementId}}, {{questionevaluations_questionId}}, {{questionevaluations_studentAnswer}}, {{questionevaluations_obtainedMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questionevaluations SET enrollement_id = {{questionevaluations_enrollementId}}, question_id = {{questionevaluations_questionId}}, student_answer = {{questionevaluations_studentAnswer}}, obtained_marks = {{questionevaluations_obtainedMarks}} WHERE question_evaluation_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_evaluation_id as questionevaluations_id,question_evaluation_id as id, questionevaluations.enrollement_id as questionevaluations_enrollementId, questionevaluations.question_id as questionevaluations_questionId, questionevaluations.student_answer as questionevaluations_studentAnswer, questionevaluations.obtained_marks as questionevaluations_obtainedMarks  FROM questionevaluations WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questionevaluations.question_evaluation_id as questionevaluations_id,
                        undefined.undefined as id,
                       questionevaluations.question_evaluation_id as  questionevaluations_questionEvaluationId,

                          questionevaluations.question_evaluation_id as undefined_questionEvaluationId,
                          
                       
                         
                          null questionevaluations.enrollement_id as questionevaluations_enrollementId, questionevaluations.question_id as questionevaluations_questionId, questionevaluations.student_answer as questionevaluations_studentAnswer, questionevaluations.obtained_marks as questionevaluations_obtainedMarks, 
                        undefined FROM questionevaluations  WHERE (questionevaluations.question_evaluation_id = {{id}}  AND  questionevaluations.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE questionevaluations SET status = 'inactive' WHERE question_evaluation_id = {{id}}"}    

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
                        successMessage: "questionevaluations Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsQuestionevaluations_object}