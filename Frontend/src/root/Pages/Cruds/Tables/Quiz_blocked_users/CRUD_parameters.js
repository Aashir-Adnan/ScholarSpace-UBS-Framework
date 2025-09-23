export const parameters = {
                  "steps": [
                    
                        {
                            "title": "quiz_blocked_users Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "quizBlockedUsers",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Quiz Blocked Users",
                                        "childFields": [
                                            {
                                              "name": "id",
                                              "label": "id",
                                              "title": "",
                                              "type": "textField",
                                              "required": false,
                                              "hideInCreateForm": true,
                                              "hideInViewForm" : true,
                                              "visible": true,
                                              "disabled": false,
                                              "dependancyCheck": false,
                                              "isPrefilled": false,
                                              "source": "req.query",
                                              "min": "",
                                              "max": "",
                                              "selectServer": false,
                                              "dynamicKey": "id"
                                            },
                                            
                                                ,
                                                {
                                                    "name": "urddId",
                                                    "label": "Urdd Id",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": false,
                                                    "hideInCreateForm": false,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "quizBlockedUsers_urddId",
                                                    "alias" : "quiz_blocked_users.urdd_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "subComponentId",
                                                    "label": "Sub Component Id",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": false,
                                                    "hideInCreateForm": false,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "quizBlockedUsers_subComponentId",
                                                    "alias" : "quiz_blocked_users.sub_component_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "questionId",
                                                    "label": "Question Id",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": false,
                                                    "hideInCreateForm": false,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "quizBlockedUsers_questionId",
                                                    "alias" : "quiz_blocked_users.question_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "reason",
                                                    "label": "Reason",
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
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "quizBlockedUsers_reason",
                                                    "alias" : "quiz_blocked_users.reason",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "quizBlockedUsers",
                                                  "label": "Add Quiz Blocked Users",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/quiz_blocked_users?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Quiz Blocked Users",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "quizBlockedUsers", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Quiz Blocked Users",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
                                              
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_quiz_blocked_users"
                        }
                  ],
                  "colMapper": { 'quiz_blocked_users_quizBlockedUsersId' : 'quiz_blocked_users_id',  'quiz_blocked_users_urddId' : 'urdd_id',  'quiz_blocked_users_subComponentId' : 'sub_component_id',  'quiz_blocked_users_questionId' : 'question_id',  'quiz_blocked_users_reason' : 'reason'}
              };