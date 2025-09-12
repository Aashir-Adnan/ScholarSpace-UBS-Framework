const parameters = require('./CRUD_parameters');
        global.GroupedCrudsTimeslots_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO timeslots (start_time, end_time, day , created_by, updated_by) VALUES ({{timeslots_startTime}}, {{timeslots_endTime}}, {{timeslots_day}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE timeslots SET start_time = {{timeslots_startTime}}, end_time = {{timeslots_endTime}}, day = {{timeslots_day}} WHERE time_slot_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, time_slot_id as timeslots_id,time_slot_id as id, timeslots.start_time as timeslots_startTime, timeslots.end_time as timeslots_endTime, timeslots.day as timeslots_day  FROM timeslots WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            timeslots.time_slot_id as timeslots_id,
                        undefined.undefined as id,
                       timeslots.time_slot_id as  timeslots_timeSlotId,

                          timeslots.time_slot_id as undefined_timeSlotId,
                          
                       
                         
                          null timeslots.start_time as timeslots_startTime, timeslots.end_time as timeslots_endTime, timeslots.day as timeslots_day, 
                        undefined FROM timeslots  WHERE (timeslots.time_slot_id = {{id}}  AND  timeslots.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE timeslots SET status = 'inactive' WHERE time_slot_id = {{id}}"}    

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
                        successMessage: "timeslots Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsTimeslots_object}