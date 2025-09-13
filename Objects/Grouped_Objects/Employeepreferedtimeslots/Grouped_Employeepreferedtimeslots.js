const parameters = require('./CRUD_parameters');
        global.GroupedCrudsEmployeepreferedtimeslots_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO employeepreferedtimeslots (employee_id, time_slot_id , created_by, updated_by) VALUES ({{employeepreferedtimeslots_employeeId}}, {{employeepreferedtimeslots_timeSlotId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE employeepreferedtimeslots SET employee_id = {{employeepreferedtimeslots_employeeId}}, time_slot_id = {{employeepreferedtimeslots_timeSlotId}}, created_by = {{employeepreferedtimeslots_createdBy}}, updated_by = {{employeepreferedtimeslots_updatedBy}} WHERE employee_prefered_time_slots_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employee_prefered_time_slots_id as employeepreferedtimeslots_id,employee_prefered_time_slots_id as id, employeepreferedtimeslots.employee_id as employeepreferedtimeslots_employeeId, employeepreferedtimeslots.time_slot_id as employeepreferedtimeslots_timeSlotId  FROM employeepreferedtimeslots WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_id,
                        undefined.undefined as id,
                       employeepreferedtimeslots.employee_prefered_time_slots_id as  employeepreferedtimeslots_employeePreferedTimeSlotsId,

                          employeepreferedtimeslots.employee_prefered_time_slots_id as undefined_employeePreferedTimeSlotsId,
                          
                       
                         
                          null employeepreferedtimeslots.employee_id as employeepreferedtimeslots_employeeId, employeepreferedtimeslots.time_slot_id as employeepreferedtimeslots_timeSlotId, 
                        undefined FROM employeepreferedtimeslots  WHERE (employeepreferedtimeslots.employee_prefered_time_slots_id = {{id}}  AND  employeepreferedtimeslots.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE employeepreferedtimeslots SET status = 'inactive' WHERE employee_prefered_time_slots_id = {{id}}"}    

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
                        successMessage: "employeepreferedtimeslots Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsEmployeepreferedtimeslots_object}