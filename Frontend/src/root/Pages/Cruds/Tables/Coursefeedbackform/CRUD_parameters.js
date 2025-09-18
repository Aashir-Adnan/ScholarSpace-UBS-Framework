/* Frontend Parameters for table: coursefeedbackform */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "coursefeedbackform Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "coursefeedbackform",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Coursefeedbackform",
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
        }
          
        
            ,
            {
                "name": "formName",
                "label": "Form Name",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "feedbackform_formName",
                "alias" : "feedbackform.form_name",
                "options": [ ""]

            }  
            
        
                ,
                {
                    "name": "courseId",
                    "label": "Course Id",
                    "title": "",
                    "type": "select",
                    "required": true,
                    "hideInCreateForm": false,
                    "hideInViewForm": true,
                    "visible": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "source": "req.body",
                    "min": "",
                    "max": "",
                    "validations": [],
                    "selectServer": true,
                    "dynamicKey": "coursefeedbackform_courseId",
                    "selectServerUrl": "/courses/dropdown?version=1.0",
                    "alias" : "coursefeedbackform.course_id"
                }
                
                ,
                {
                    "name": "feedbackFormId",
                    "label": "Feedback Form Id",
                    "title": "",
                    "type": "select",
                    "required": true,
                    "hideInCreateForm": false,
                    "hideInViewForm": true,
                    "visible": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "source": "req.body",
                    "min": "",
                    "max": "",
                    "validations": [],
                    "selectServer": true,
                    "dynamicKey": "coursefeedbackform_feedbackFormId",
                    "selectServerUrl": "/feedbackform/dropdown?version=1.0",
                    "alias" : "coursefeedbackform.feedback_form_id"
                }
                
          
          
                ,
                {
                  "name": "createdAt",
                  "label": "Created At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "coursefeedbackform_createdAt",
                  "alias" : "coursefeedbackform.created_at"
                }
                ,
                {
                  "name": "updatedAt",
                  "label": "Updated At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "coursefeedbackform_updatedAt",
                  "alias" : "coursefeedbackform.updated_at"
                }  

          
            ,
            {
                "name": "status",
                "label": "Status",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "coursefeedbackform_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "coursefeedbackform.status"
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
                    ]
                    }
                ],
                "colMapper": "{ 'coursefeedbackform_courseFeedBackFormId' : 'course_feed_back_form_id',  'coursefeedbackform_courseId' : 'course_id',  'coursefeedbackform_feedbackFormId' : 'feedback_form_id',  'coursefeedbackform_status' : 'status',  'coursefeedbackform_createdBy' : 'created_by',  'coursefeedbackform_updatedBy' : 'updated_by',  'coursefeedbackform_createdAt' : 'created_at',  'coursefeedbackform_updatedAt' : 'updated_at',  'coursefeedbackform_formName' : 'form_name'}"
                };