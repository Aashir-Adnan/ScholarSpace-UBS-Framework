const parameters = {
              "steps": [
                  
                          {
                              "title": "Clo Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "clo",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Clo",
                                          "childFields": [
                                                  {
                                                    "name": "clo_id",
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
                                                    "dynamicKey": "clo_id"
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
                                                          "name": "clonum",
                                                          "label": "Clonum",
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
                                                          "dynamicKey": "clo_clonum"
                                                      },
                                                      {
                                                          "name": "clodomainName",
                                                          "label": "Clodomain Name",
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
                                                          "dynamicKey": "clo_clodomainName"
                                                      },
                                                      {
                                                          "name": "description",
                                                          "label": "Description",
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
                                                          "dynamicKey": "clo_description"
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
                              "permission": "clo_view"
                          },
                          {
                              "title": "Courses Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "courses",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Clo",
                                          "childFields": [
                                                  {
                                                    "name": "courses_id",
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
                                                    "dynamicKey": "courses_id"
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
                                                          "name": "courseSubDomainPrefix",
                                                          "label": "Course Sub Domain Prefix",
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
                                                          "dynamicKey": "courses_courseSubDomainPrefix"
                                                      },
                                                      {
                                                          "name": "plannedCourseId",
                                                          "label": "Planned Course Id",
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
                                                          "dynamicKey": "courses_plannedCourseId"
                                                      },
                                                      {
                                                          "name": "cloid",
                                                          "label": "Cloid",
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
                                                          "dynamicKey": "courses_cloid"
                                                      },
                                                      {
                                                          "name": "teacherEmployeeId",
                                                          "label": "Teacher Employee Id",
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
                                                          "dynamicKey": "courses_teacherEmployeeId"
                                                      },
                                                      {
                                                          "name": "tassistEmployeeId",
                                                          "label": "Tassist Employee Id",
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
                                                          "dynamicKey": "courses_tassistEmployeeId"
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
                              "permission": "courses_view"
                          },
                          {
                              "title": "Questions Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "questions",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Clo",
                                          "childFields": [
                                                  {
                                                    "name": "questions_id",
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
                                                    "dynamicKey": "questions_id"
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
                                                          "name": "cloid",
                                                          "label": "Cloid",
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
                                                          "dynamicKey": "questions_cloid"
                                                      },
                                                      {
                                                          "name": "subComponentId",
                                                          "label": "Sub Component Id",
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
                                                          "dynamicKey": "questions_subComponentId"
                                                      },
                                                      {
                                                          "name": "questionNum",
                                                          "label": "Question Num",
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
                                                          "dynamicKey": "questions_questionNum"
                                                      },
                                                      {
                                                          "name": "description",
                                                          "label": "Description",
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
                                                          "dynamicKey": "questions_description"
                                                      },
                                                      {
                                                          "name": "questionMarks",
                                                          "label": "Question Marks",
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
                                                          "dynamicKey": "questions_questionMarks"
                                                      },
                                                      {
                                                          "name": "lecturesTopicId",
                                                          "label": "Lectures Topic Id",
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
                                                          "dynamicKey": "questions_lecturesTopicId"
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
                              "permission": "questions_view"
                          }
              ],
              "colMapper": "{ 'clo_cloid' : 'cloid',  'clo_clonum' : 'clonum',  'clo_clodomainName' : 'clodomain_name',  'clo_description' : 'description',  'courses_courseId' : 'course_id',  'courses_courseSubDomainPrefix' : 'course_sub_domain_prefix',  'courses_plannedCourseId' : 'planned_course_id',  'courses_cloid' : 'cloid',  'courses_teacherEmployeeId' : 'teacher_employee_id',  'courses_tassistEmployeeId' : 'tassist_employee_id',  'questions_questionId' : 'question_id',  'questions_cloid' : 'cloid',  'questions_subComponentId' : 'sub_component_id',  'questions_questionNum' : 'question_num',  'questions_description' : 'description',  'questions_questionMarks' : 'question_marks',  'questions_lecturesTopicId' : 'lectures_topic_id'}"
          };
          module.exports = parameters;