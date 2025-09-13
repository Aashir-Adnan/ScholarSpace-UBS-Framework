const parameters = {
              "steps": [
                  
                          {
                              "title": "Employeepreferedtimeslots Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "employeepreferedtimeslots",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Employeepreferedtimeslots",
                                          "childFields": [
                                                  {
                                                    "name": "employeepreferedtimeslots_id",
                                                    "label": "id",
                                                    "title": "",
                                                    "type": "textField",
                                                    "required": false,
                                                    "hideInCreateForm": true,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.query",
                                                    "min": "",
                                                    "max": "",
                                                    "selectServer": false,
                                                    "dynamicKey": "employeepreferedtimeslots_id"
                                                  },
                                                  {
                                                    "name": "actionPerformerURDD",
                                                    "label": "actionPerformerURDD",
                                                    "title": "",
                                                    "type": "textField",
                                                    "required": false,
                                                    "hideInCreateForm": false,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "selectServer": false,
                                                    "dynamicKey": "actionPerformerURDD",
                                                    "alias" : "actionPerformerURDD",
                                                },
                                              
                                                      {
                                                          "name": "employeeId",
                                                          "label": "Employee Id",
                                                          "title": "",
                                                          "type": "textField",
                                                          "required": false,
                                                          "hideInCreateForm": false,
                                                          "visible": true,
                                                          "disabled": false,
                                                          "dependancyCheck": false,
                                                          "isPrefilled": false,
                                                          "source": "req.body",
                                                          "min": "",
                                                          "max": "",
                                                          "selectServer": false,
                                                          "dynamicKey": "employeepreferedtimeslots_employeeId"
                                                      },
                                                      {
                                                          "name": "timeSlotId",
                                                          "label": "Time Slot Id",
                                                          "title": "",
                                                          "type": "textField",
                                                          "required": false,
                                                          "hideInCreateForm": false,
                                                          "visible": true,
                                                          "disabled": false,
                                                          "dependancyCheck": false,
                                                          "isPrefilled": false,
                                                          "source": "req.body",
                                                          "min": "",
                                                          "max": "",
                                                          "selectServer": false,
                                                          "dynamicKey": "employeepreferedtimeslots_timeSlotId"
                                                      }
                                          ]
                                      }
                                  ]
                              },
                              "buttons": [
                                  {
                                      "type": "submit",
                                      "label": "Submit"
                                  }
                              ],
                              "permission": "employeepreferedtimeslots_view"
                          }
              ],
              "colMapper": "{ 'employeepreferedtimeslots_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'employeepreferedtimeslots_employeeId' : 'employee_id',  'employeepreferedtimeslots_timeSlotId' : 'time_slot_id',  'employeepreferedtimeslots_status' : 'status',  'employeepreferedtimeslots_createdBy' : 'created_by',  'employeepreferedtimeslots_updatedBy' : 'updated_by',  'employeepreferedtimeslots_createdAt' : 'created_at',  'employeepreferedtimeslots_updatedAt' : 'updated_at'}"
          };
          module.exports = parameters;