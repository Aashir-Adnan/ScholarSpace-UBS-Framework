export const parameters = {
                  "steps": [
                    
                        {
                            "title": "employeepreferedtimeslots Info",
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
                                                    "name": "employeeId",
                                                    "label": "Employee Id",
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
                                                    "dynamicKey": "employeepreferedtimeslots_employeeId",
                                                    "alias" : "employeepreferedtimeslots.employee_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "timeSlotId",
                                                    "label": "Time Slot Id",
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
                                                    "dynamicKey": "employeepreferedtimeslots_timeSlotId",
                                                    "alias" : "employeepreferedtimeslots.time_slot_id",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "employeepreferedtimeslots",
                                                  "label": "Add Employeepreferedtimeslots",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/employeepreferedtimeslots?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Employeepreferedtimeslots",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "employeepreferedtimeslots", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Employeepreferedtimeslots",
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
                                                    "dynamicKey": "employeepreferedtimeslots_createdAt",
                                                    "alias" : "employeepreferedtimeslots.created_at"
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
                                                    "dynamicKey": "employeepreferedtimeslots_updatedAt",
                                                    "alias" : "employeepreferedtimeslots.updated_at"
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
                                                    "dynamicKey": "employeepreferedtimeslots_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "employeepreferedtimeslots.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_employeepreferedtimeslots"
                        },
                        {
                            "title": "coursetimetablesschedule Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "coursetimetablesschedule",
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
                                                    "name": "timeSlotId",
                                                    "label": "Time Slot Id",
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
                                                    "dynamicKey": "coursetimetablesschedule_timeSlotId",
                                                    "alias" : "coursetimetablesschedule.time_slot_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "roomId",
                                                    "label": "Room Id",
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
                                                    "dynamicKey": "coursetimetablesschedule_roomId",
                                                    "alias" : "coursetimetablesschedule.room_id",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "coursetimetablesschedule",
                                                  "label": "Add Coursetimetablesschedule",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/employeepreferedtimeslots?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Coursetimetablesschedule",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "coursetimetablesschedule", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Coursetimetablesschedule",
                                                  "childFields":[
                                                
                                                  
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
                                                        "dynamicKey": "coursetimetablesschedule_courseId",
                                                        "selectServerUrl": "/courses/dropdown?version=1.0",
                                                        "alias" : "coursetimetablesschedule.course_id"
                                                    },
                                                     {
                                                        "name": "coursesName",
                                                        "label": "CoursesName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": true,
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
                                                        "dynamicKey": "coursetimetablesschedule_coursesName",
                                                        "selectServerUrl": "/courses/dropdown?version=1.0",
                                                        "alias" : "coursetimetablesschedule.coursesName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "employeePreferedTimeSlotsId",
                                                        "label": "Employee Prefered Time Slots Id",
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
                                                        "dynamicKey": "coursetimetablesschedule_employeePreferedTimeSlotsId",
                                                        "selectServerUrl": "/employeepreferedtimeslots/dropdown?version=1.0",
                                                        "alias" : "coursetimetablesschedule.employee_prefered_time_slots_id"
                                                    },
                                                     {
                                                        "name": "employeepreferedtimeslotsName",
                                                        "label": "EmployeepreferedtimeslotsName",
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
                                                        "dynamicKey": "coursetimetablesschedule_employeepreferedtimeslotsName",
                                                        "selectServerUrl": "/employeepreferedtimeslots/dropdown?version=1.0",
                                                        "alias" : "coursetimetablesschedule.employeepreferedtimeslotsName"
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
                                                    "dynamicKey": "coursetimetablesschedule_createdAt",
                                                    "alias" : "coursetimetablesschedule.created_at"
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
                                                    "dynamicKey": "coursetimetablesschedule_updatedAt",
                                                    "alias" : "coursetimetablesschedule.updated_at"
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
                                                    "dynamicKey": "coursetimetablesschedule_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "coursetimetablesschedule.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_coursetimetablesschedule"
                        }
                  ],
                  "colMapper": { 'employeepreferedtimeslots_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'employeepreferedtimeslots_employeeId' : 'employee_id',  'employeepreferedtimeslots_timeSlotId' : 'time_slot_id',  'employeepreferedtimeslots_status' : 'status',  'employeepreferedtimeslots_createdBy' : 'created_by',  'employeepreferedtimeslots_updatedBy' : 'updated_by',  'employeepreferedtimeslots_createdAt' : 'created_at',  'employeepreferedtimeslots_updatedAt' : 'updated_at',  'coursetimetablesschedule_courseLscheduleId' : 'course_lschedule_id',  'coursetimetablesschedule_courseId' : 'course_id',  'coursetimetablesschedule_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'coursetimetablesschedule_timeSlotId' : 'time_slot_id',  'coursetimetablesschedule_roomId' : 'room_id',  'coursetimetablesschedule_status' : 'status',  'coursetimetablesschedule_createdBy' : 'created_by',  'coursetimetablesschedule_updatedBy' : 'updated_by',  'coursetimetablesschedule_createdAt' : 'created_at',  'coursetimetablesschedule_updatedAt' : 'updated_at'}
              };