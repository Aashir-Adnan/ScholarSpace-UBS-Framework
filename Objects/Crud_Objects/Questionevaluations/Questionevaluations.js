/* CRUD Objects for table: questionevaluations */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuestionevaluations_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
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
                              accessToken: true
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
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO questionevaluations (enrollement_id, question_id, student_answer, obtained_marks, created_by, updated_by) VALUES ({{questionevaluations_enrollementId}}, {{questionevaluations_questionId}}, {{questionevaluations_studentAnswer}}, {{questionevaluations_obtainedMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE questionevaluations SET enrollement_id = {{questionevaluations_enrollementId}}, question_id = {{questionevaluations_questionId}}, student_answer = {{questionevaluations_studentAnswer}}, obtained_marks = {{questionevaluations_obtainedMarks}} WHERE question_evaluation_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questionevaluations.question_evaluation_id as questionevaluations_id, questionevaluations.question_evaluation_id as id, questionevaluations.question_evaluation_id as questionevaluations_questionEvaluationId,questionevaluations.enrollement_id as questionevaluations_enrollementId,questionevaluations.question_id as questionevaluations_questionId,questionevaluations.student_answer as questionevaluations_studentAnswer,questionevaluations.obtained_marks as questionevaluations_obtainedMarks FROM questionevaluations  Where questionevaluations.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT questionevaluations.question_evaluation_id as questionevaluations_id, questionevaluations.question_evaluation_id as id, questionevaluations.question_evaluation_id as questionevaluations_questionEvaluationId,questionevaluations.enrollement_id as questionevaluations_enrollementId,questionevaluations.question_id as questionevaluations_questionId,questionevaluations.student_answer as questionevaluations_studentAnswer,questionevaluations.obtained_marks as questionevaluations_obtainedMarks FROM questionevaluations  WHERE question_evaluation_id = {{id}} OR question_evaluation_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE questionevaluations SET status = 'inactive' WHERE question_evaluation_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_questionevaluations", View: "view_questionevaluations", Update: "update_questionevaluations", Delete: "delete_questionevaluations", List: "list_questionevaluations" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Questionevaluations CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Questionevaluations.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestionevaluations_object}