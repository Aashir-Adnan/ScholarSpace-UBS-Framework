/* Frontend Parameters for table: enrollements */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "enrollements Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "enrollements",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Enrollements",
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
                "name": "grade",
                "label": "Grade",
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
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "enrollements_grade",
                "alias" : "enrollements.grade",
                "options": []

            }
            ,
            {
                "name": "groupName",
                "label": "Group Name",
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
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "enrollements_groupName",
                "alias" : "enrollements.group_name",
                "options": []

            }  
          
            
        
                ,
                {
                    "name": "studentSemesterId",
                    "label": "Student Semester Id",
                    "title": "",
                    "type": "select",
                    "required": false,
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
                    "dynamicKey": "enrollements_studentSemesterId",
                    "selectServerUrl": "/studentsemesters/dropdown?version=1.0",
                    "alias" : "enrollements.student_semester_id"
                }
                
                ,
                {
                    "name": "courseId",
                    "label": "Course Id",
                    "title": "",
                    "type": "select",
                    "required": false,
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
                    "dynamicKey": "enrollements_courseId",
                    "selectServerUrl": "/courses/dropdown?version=1.0",
                    "alias" : "enrollements.course_id"
                }
                
        
          ,
          {
              "name": "enrolledDate",
              "label": "Enrolled Date",
              "title": "",
              "type": "datetime",
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
              "dynamicKey": "enrollements_enrolledDate"
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
                  "dynamicKey": "enrollements_createdAt",
                  "alias" : "enrollements.created_at"
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
                  "dynamicKey": "enrollements_updatedAt",
                  "alias" : "enrollements.updated_at"
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
                "dynamicKey": "enrollements_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "enrollements.status"
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
                "colMapper": "{ 'enrollements_enrollementId' : 'enrollement_id',  'enrollements_studentSemesterId' : 'student_semester_id',  'enrollements_grade' : 'grade',  'enrollements_groupName' : 'group_name',  'enrollements_enrolledDate' : 'enrolled_date',  'enrollements_courseId' : 'course_id',  'enrollements_status' : 'status',  'enrollements_createdBy' : 'created_by',  'enrollements_updatedBy' : 'updated_by',  'enrollements_createdAt' : 'created_at',  'enrollements_updatedAt' : 'updated_at'}"
                };