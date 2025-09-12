const parameters = require('./CRUD_parameters');
        global.GroupedCrudsRooms_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO rooms (room_name, room_capacity, room_location , created_by, updated_by) VALUES ({{rooms_roomName}}, {{rooms_roomCapacity}}, {{rooms_roomLocation}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE rooms SET room_name = {{rooms_roomName}}, room_capacity = {{rooms_roomCapacity}}, room_location = {{rooms_roomLocation}} WHERE room_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, room_id as rooms_id,room_id as id, rooms.room_name as rooms_roomName, rooms.room_capacity as rooms_roomCapacity, rooms.room_location as rooms_roomLocation  FROM rooms WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            rooms.room_id as rooms_id,
                        undefined.undefined as id,
                       rooms.room_id as  rooms_roomId,

                          rooms.room_id as undefined_roomId,
                          
                       
                         
                          null rooms.room_name as rooms_roomName, rooms.room_capacity as rooms_roomCapacity, rooms.room_location as rooms_roomLocation, 
                        undefined FROM rooms  WHERE (rooms.room_id = {{id}}  AND  rooms.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE rooms SET status = 'inactive' WHERE room_id = {{id}}"}    

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
                        successMessage: "rooms Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsRooms_object}