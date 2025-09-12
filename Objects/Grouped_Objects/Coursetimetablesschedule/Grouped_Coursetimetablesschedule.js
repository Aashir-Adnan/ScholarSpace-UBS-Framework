const parameters = require('./CRUD_parameters');
        global.GroupedCrudsCoursetimetablesschedule_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO coursetimetablesschedule (course_id, employee_prefered_time_slots_id, time_slot_id, room_id , created_by, updated_by) VALUES ({{coursetimetablesschedule_courseId}}, {{coursetimetablesschedule_employeePreferedTimeSlotsId}}, {{coursetimetablesschedule_timeSlotId}}, {{coursetimetablesschedule_roomId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE coursetimetablesschedule SET course_id = {{coursetimetablesschedule_courseId}}, employee_prefered_time_slots_id = {{coursetimetablesschedule_employeePreferedTimeSlotsId}}, time_slot_id = {{coursetimetablesschedule_timeSlotId}}, room_id = {{coursetimetablesschedule_roomId}} WHERE course_lschedule_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_lschedule_id as coursetimetablesschedule_id,course_lschedule_id as id, coursetimetablesschedule.course_id as coursetimetablesschedule_courseId, coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId, coursetimetablesschedule.room_id as coursetimetablesschedule_roomId  FROM coursetimetablesschedule WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_id,
                        undefined.undefined as id,
                       coursetimetablesschedule.course_lschedule_id as  coursetimetablesschedule_courseLscheduleId,

                          coursetimetablesschedule.course_lschedule_id as undefined_courseLscheduleId,
                          
                       
                         
                          null coursetimetablesschedule.course_id as coursetimetablesschedule_courseId, coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId, coursetimetablesschedule.room_id as coursetimetablesschedule_roomId, 
                        undefined FROM coursetimetablesschedule  WHERE (coursetimetablesschedule.course_lschedule_id = {{id}}  AND  coursetimetablesschedule.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE coursetimetablesschedule SET status = 'inactive' WHERE course_lschedule_id = {{id}}"}    

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
                        successMessage: "coursetimetablesschedule Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsCoursetimetablesschedule_object}