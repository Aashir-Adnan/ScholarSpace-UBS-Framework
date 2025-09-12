const parameters = require('./CRUD_parameters');
        global.GroupedCrudsChat_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO chat (sub_component_id, user_role_id, message, message_time, private_chat , created_by, updated_by) VALUES ({{chat_subComponentId}}, {{chat_userRoleId}}, {{chat_message}}, {{chat_messageTime}}, {{chat_privateChat}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE chat SET sub_component_id = {{chat_subComponentId}}, user_role_id = {{chat_userRoleId}}, message = {{chat_message}}, message_time = {{chat_messageTime}}, private_chat = {{chat_privateChat}} WHERE chat_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, chat_id as chat_id,chat_id as id, chat.sub_component_id as chat_subComponentId, chat.user_role_id as chat_userRoleId, chat.message as chat_message, chat.message_time as chat_messageTime, chat.private_chat as chat_privateChat  FROM chat WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            chat.chat_id as chat_id,
                        undefined.undefined as id,
                       chat.chat_id as  chat_chatId,

                          chat.chat_id as undefined_chatId,
                          
                       
                         
                          null chat.sub_component_id as chat_subComponentId, chat.user_role_id as chat_userRoleId, chat.message as chat_message, chat.message_time as chat_messageTime, chat.private_chat as chat_privateChat, 
                        undefined FROM chat  WHERE (chat.chat_id = {{id}}  AND  chat.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE chat SET status = 'inactive' WHERE chat_id = {{id}}"}    

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
                        successMessage: "chat Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsChat_object}