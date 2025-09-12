const parameters = {
              "steps": [
                  
                          {
                              "title": "Classcomponent Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "classcomponent",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Classcomponent",
                                          "childFields": [
                                                  {
                                                    "name": "classcomponent_id",
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
                                                    "dynamicKey": "classcomponent_id"
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
                                                          "name": "courseId",
                                                          "label": "Course Id",
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
                                                          "dynamicKey": "classcomponent_courseId"
                                                      },
                                                      {
                                                          "name": "componentType",
                                                          "label": "Component Type",
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
                                                          "dynamicKey": "classcomponent_componentType"
                                                      },
                                                      {
                                                          "name": "componentName",
                                                          "label": "Component Name",
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
                                                          "dynamicKey": "classcomponent_componentName"
                                                      },
                                                      {
                                                          "name": "weightage",
                                                          "label": "Weightage",
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
                                                          "dynamicKey": "classcomponent_weightage"
                                                      },
                                                      {
                                                          "name": "componentPolicy",
                                                          "label": "Component Policy",
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
                                                          "dynamicKey": "classcomponent_componentPolicy"
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
                              "permission": "classcomponent_view"
                          }
              ],
              "colMapper": "{ 'classcomponent_componentId' : 'component_id',  'classcomponent_courseId' : 'course_id',  'classcomponent_componentType' : 'component_type',  'classcomponent_componentName' : 'component_name',  'classcomponent_weightage' : 'weightage',  'classcomponent_componentPolicy' : 'component_policy'}"
          };
          module.exports = parameters;