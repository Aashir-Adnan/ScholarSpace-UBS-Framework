/* CRUD Objects for table: question_answers_submitted */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuestion_answers_submitted_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO question_answers_submitted (urdd, question_id, questions_solution_options_id, description, marks_obtained, created_by, updated_by) VALUES ({{questionAnswersSubmitted_urdd}}, {{questionAnswersSubmitted_questionId}}, {{questionAnswersSubmitted_questionsSolutionOptionsId}}, {{questionAnswersSubmitted_description}}, {{questionAnswersSubmitted_marksObtained}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE question_answers_submitted SET urdd = {{questionAnswersSubmitted_urdd}}, question_id = {{questionAnswersSubmitted_questionId}}, questions_solution_options_id = {{questionAnswersSubmitted_questionsSolutionOptionsId}}, description = {{questionAnswersSubmitted_description}}, marks_obtained = {{questionAnswersSubmitted_marksObtained}} WHERE question_answers_submitted_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_id, question_answers_submitted.question_answers_submitted_id as id, question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_questionAnswersSubmittedId,question_answers_submitted.urdd as questionAnswersSubmitted_urdd,question_answers_submitted.question_id as questionAnswersSubmitted_questionId,question_answers_submitted.questions_solution_options_id as questionAnswersSubmitted_questionsSolutionOptionsId,question_answers_submitted.description as questionAnswersSubmitted_description,question_answers_submitted.marks_obtained as questionAnswersSubmitted_marksObtained FROM question_answers_submitted  Where question_answers_submitted.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_id, question_answers_submitted.question_answers_submitted_id as id, question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_questionAnswersSubmittedId,question_answers_submitted.urdd as questionAnswersSubmitted_urdd,question_answers_submitted.question_id as questionAnswersSubmitted_questionId,question_answers_submitted.questions_solution_options_id as questionAnswersSubmitted_questionsSolutionOptionsId,question_answers_submitted.description as questionAnswersSubmitted_description,question_answers_submitted.marks_obtained as questionAnswersSubmitted_marksObtained FROM question_answers_submitted  WHERE question_answers_submitted_id = {{id}} OR question_answers_submitted_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE question_answers_submitted SET status = 'inactive' WHERE question_answers_submitted_id = {{id}}"},           
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
                        permission: { Add: "add_question_answers_submitted", View: "view_question_answers_submitted", Update: "update_question_answers_submitted", Delete: "delete_question_answers_submitted", List: "list_question_answers_submitted" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Question_answers_submitted CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Question_answers_submitted.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestion_answers_submitted_object}