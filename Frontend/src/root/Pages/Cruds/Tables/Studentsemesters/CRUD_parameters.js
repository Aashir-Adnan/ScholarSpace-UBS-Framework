export const parameters = {
                  "steps": [
                    
                        {
                            "title": "studentsemesters Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "studentsemesters",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Studentsemesters",
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
                                                    "name": "studentUserId",
                                                    "label": "Student User Id",
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
                                                    "dynamicKey": "studentsemesters_studentUserId",
                                                    "alias" : "studentsemesters.student_user_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "semesterId",
                                                    "label": "Semester Id",
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
                                                    "dynamicKey": "studentsemesters_semesterId",
                                                    "alias" : "studentsemesters.semester_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "cGPA",
                                                    "label": "CGPA",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "studentsemesters_cGPA",
                                                    "alias" : "studentsemesters.CGPA",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "sGPA",
                                                    "label": "SGPA",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "studentsemesters_sGPA",
                                                    "alias" : "studentsemesters.SGPA",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "creditsAcquired",
                                                    "label": "Credits Acquired",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "studentsemesters_creditsAcquired",
                                                    "alias" : "studentsemesters.credits_acquired",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "attendanceDelta",
                                                    "label": "Attendance Delta",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "studentsemesters_attendanceDelta",
                                                    "alias" : "studentsemesters.attendance_delta",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "studentsemesters",
                                                  "label": "Add Studentsemesters",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/studentsemesters?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Studentsemesters",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "studentsemesters", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Studentsemesters",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
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
                                                    "dynamicKey": "studentsemesters_createdAt",
                                                    "alias" : "studentsemesters.created_at"
                                                },
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
                                                    "dynamicKey": "studentsemesters_updatedAt",
                                                    "alias" : "studentsemesters.updated_at"
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
                                                    "dynamicKey": "studentsemesters_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "studentsemesters.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_studentsemesters"
                        },
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
                                        "title": "Studentsemesters",
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
                                                    "dynamicKey": "enrollements_grade",
                                                    "alias" : "enrollements.grade",
                                                    "options": "[]"
  
                                                },
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
                                                    "dynamicKey": "enrollements_groupName",
                                                    "alias" : "enrollements.group_name",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "enrollements",
                                                  "label": "Add Enrollements",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/studentsemesters?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Enrollements",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "enrollements", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Enrollements",
                                                  "childFields":[
                                                
                                                  
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
                                                    },
                                                     {
                                                        "name": "studentsemestersName",
                                                        "label": "StudentsemestersName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": false,
                                                        "hideInCreateForm": true,
                                                        "hideInViewForm": true,
                                                        "visible": true,
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": true,
                                                        "dynamicKey": "enrollements_studentsemestersName",
                                                        "selectServerUrl": "/studentsemesters/dropdown?version=1.0",
                                                        "alias" : "enrollements.studentsemestersName"
                                                    }
                                                    ,
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
                                                    },
                                                     {
                                                        "name": "coursesName",
                                                        "label": "CoursesName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": false,
                                                        "hideInCreateForm": true,
                                                        "hideInViewForm": true,
                                                        "visible": true,
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": true,
                                                        "dynamicKey": "enrollements_coursesName",
                                                        "selectServerUrl": "/courses/dropdown?version=1.0",
                                                        "alias" : "enrollements.coursesName"
                                                    }
                                                    



 
                                                ,
                                              {
                                                  "name": "enrolledDate",
                                                  "label": "Enrolled Date",
                                                  "title": "",
                                                  "type": "dateTime",
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
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
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
                                                },
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
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "enrollements.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_enrollements"
                        }
                  ],
                  "colMapper": { 'studentsemesters_studentSemesterId' : 'student_semester_id',  'studentsemesters_studentUserId' : 'student_user_id',  'studentsemesters_semesterId' : 'semester_id',  'studentsemesters_CGPA' : 'CGPA',  'studentsemesters_SGPA' : 'SGPA',  'studentsemesters_creditsAcquired' : 'credits_acquired',  'studentsemesters_attendanceDelta' : 'attendance_delta',  'studentsemesters_status' : 'status',  'studentsemesters_createdBy' : 'created_by',  'studentsemesters_updatedBy' : 'updated_by',  'studentsemesters_createdAt' : 'created_at',  'studentsemesters_updatedAt' : 'updated_at',  'enrollements_enrollementId' : 'enrollement_id',  'enrollements_studentSemesterId' : 'student_semester_id',  'enrollements_grade' : 'grade',  'enrollements_groupName' : 'group_name',  'enrollements_enrolledDate' : 'enrolled_date',  'enrollements_courseId' : 'course_id',  'enrollements_status' : 'status',  'enrollements_createdBy' : 'created_by',  'enrollements_updatedBy' : 'updated_by',  'enrollements_createdAt' : 'created_at',  'enrollements_updatedAt' : 'updated_at'}
              };