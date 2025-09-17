/* CRUD Objects for table: questions_solution_options */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuestions_solution_options_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO questions_solution_options (question_id, description, option_number, correct_option, created_by, updated_by) VALUES ({{questionsSolutionOptions_questionId}}, {{questionsSolutionOptions_description}}, {{questionsSolutionOptions_optionNumber}}, {{questionsSolutionOptions_correctOption}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE questions_solution_options SET question_id = {{questionsSolutionOptions_questionId}}, description = {{questionsSolutionOptions_description}}, option_number = {{questionsSolutionOptions_optionNumber}}, correct_option = {{questionsSolutionOptions_correctOption}} WHERE questions_solution_options_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions_solution_options.questions_solution_options_id as questionsSolutionOptions_id, questions_solution_options.questions_solution_options_id as id, questions_solution_options.questions_solution_options_id as questionsSolutionOptions_questionsSolutionOptionsId,questions_solution_options.question_id as questionsSolutionOptions_questionId,questions_solution_options.description as questionsSolutionOptions_description,questions_solution_options.option_number as questionsSolutionOptions_optionNumber,questions_solution_options.correct_option as questionsSolutionOptions_correctOption FROM questions_solution_options  Where questions_solution_options.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT questions_solution_options.questions_solution_options_id as questionsSolutionOptions_id, questions_solution_options.questions_solution_options_id as id, questions_solution_options.questions_solution_options_id as questionsSolutionOptions_questionsSolutionOptionsId,questions_solution_options.question_id as questionsSolutionOptions_questionId,questions_solution_options.description as questionsSolutionOptions_description,questions_solution_options.option_number as questionsSolutionOptions_optionNumber,questions_solution_options.correct_option as questionsSolutionOptions_correctOption FROM questions_solution_options  WHERE questions_solution_options_id = {{id}} OR questions_solution_options_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE questions_solution_options SET status = 'inactive' WHERE questions_solution_options_id = {{id}}"},           
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
                        permission: { Add: "add_questions_solution_options", View: "view_questions_solution_options", Update: "update_questions_solution_options", Delete: "delete_questions_solution_options", List: "list_questions_solution_options" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Questions_solution_options CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Questions_solution_options.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestions_solution_options_object}