const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSubcomponents_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, user_role_id, date, start_time, end_time, total_marks, weightage, is_public , created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_userRoleId}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, user_role_id = {{subcomponents_userRoleId}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}} WHERE sub_component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_id as subcomponents_id,sub_component_id as id, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic  FROM subcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, courseleaderboards.leaderboard_name as  courseleaderboardsubcomponents_courseleaderboardsName, enrollements.group_name as  courseleaderboardsubcomponents_enrollementsName,

                          subcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as courseleaderboardsubcomponents_attendanceId, lecturetopics.lectures_topic_id as courseleaderboardsubcomponents_lecturesTopicId, questions.question_id as courseleaderboardsubcomponents_questionId, subcomponentmarks.sub_component_mark_id as courseleaderboardsubcomponents_subComponentMarkId, courseleaderboards.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, enrollements.enrollement_id as courseleaderboardsubcomponents_enrollementId,
                          
                       
                         
                           subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, 
                        courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage FROM subcomponents LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (subcomponents.sub_component_id = {{id}}  AND  subcomponents.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subcomponents SET status = 'inactive' WHERE sub_component_id = {{id}}"}    

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
                        successMessage: "subcomponents Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courseleaderboardsubcomponents (course_leaderboard_id, sub_component_id, subcomponent_percentage , created_by, updated_by) VALUES ({{courseleaderboardsubcomponents_courseLeaderboardId}}, {{courseleaderboardsubcomponents_subComponentId}}, {{courseleaderboardsubcomponents_subcomponentPercentage}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courseleaderboardsubcomponents SET course_leaderboard_id = {{courseleaderboardsubcomponents_courseLeaderboardId}}, sub_component_id = {{courseleaderboardsubcomponents_subComponentId}}, subcomponent_percentage = {{courseleaderboardsubcomponents_subcomponentPercentage}} WHERE course_leaderboard_subcomponent_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id,course_leaderboard_subcomponent_id as id, courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage  FROM courseleaderboardsubcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, courseleaderboards.leaderboard_name as  courseleaderboardsubcomponents_courseleaderboardsName, enrollements.group_name as  courseleaderboardsubcomponents_enrollementsName,

                          subcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as courseleaderboardsubcomponents_attendanceId, lecturetopics.lectures_topic_id as courseleaderboardsubcomponents_lecturesTopicId, questions.question_id as courseleaderboardsubcomponents_questionId, subcomponentmarks.sub_component_mark_id as courseleaderboardsubcomponents_subComponentMarkId, courseleaderboards.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, enrollements.enrollement_id as courseleaderboardsubcomponents_enrollementId,
                          
                       
                         
                           courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage, 
                        courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage FROM subcomponents LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (courseleaderboardsubcomponents.course_leaderboard_subcomponent_id = {{id}}  AND  courseleaderboardsubcomponents.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE courseleaderboardsubcomponents SET status = 'inactive' WHERE course_leaderboard_subcomponent_id = {{id}}"}    

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
                        successMessage: "courseleaderboardsubcomponents Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id , created_by, updated_by) VALUES ({{lecturesattendance_enrollementId}}, {{lecturesattendance_date}}, {{lecturesattendance_isPresent}}, {{lecturesattendance_subComponentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturesattendance SET enrollement_id = {{lecturesattendance_enrollementId}}, date = {{lecturesattendance_date}}, is_present = {{lecturesattendance_isPresent}}, sub_component_id = {{lecturesattendance_subComponentId}} WHERE attendance_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, attendance_id as lecturesattendance_id,attendance_id as id, lecturesattendance.enrollement_id as lecturesattendance_enrollementId, lecturesattendance.date as lecturesattendance_date, lecturesattendance.is_present as lecturesattendance_isPresent, lecturesattendance.sub_component_id as lecturesattendance_subComponentId  FROM lecturesattendance WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, courseleaderboards.leaderboard_name as  courseleaderboardsubcomponents_courseleaderboardsName, enrollements.group_name as  courseleaderboardsubcomponents_enrollementsName,

                          subcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as courseleaderboardsubcomponents_attendanceId, lecturetopics.lectures_topic_id as courseleaderboardsubcomponents_lecturesTopicId, questions.question_id as courseleaderboardsubcomponents_questionId, subcomponentmarks.sub_component_mark_id as courseleaderboardsubcomponents_subComponentMarkId, courseleaderboards.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, enrollements.enrollement_id as courseleaderboardsubcomponents_enrollementId,
                          
                       
                         
                           lecturesattendance.enrollement_id as lecturesattendance_enrollementId, lecturesattendance.date as lecturesattendance_date, lecturesattendance.is_present as lecturesattendance_isPresent, lecturesattendance.sub_component_id as lecturesattendance_subComponentId, 
                        courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage FROM subcomponents LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (lecturesattendance.attendance_id = {{id}}  AND  lecturesattendance.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE lecturesattendance SET status = 'inactive' WHERE attendance_id = {{id}}"}    

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
                        successMessage: "lecturesattendance Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturetopics (sub_component_id, topic_name, description, book_id , created_by, updated_by) VALUES ({{lecturetopics_subComponentId}}, {{lecturetopics_topicName}}, {{lecturetopics_description}}, {{lecturetopics_bookId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET sub_component_id = {{lecturetopics_subComponentId}}, topic_name = {{lecturetopics_topicName}}, description = {{lecturetopics_description}}, book_id = {{lecturetopics_bookId}} WHERE lectures_topic_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lectures_topic_id as lecturetopics_id,lectures_topic_id as id, lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId  FROM lecturetopics WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, courseleaderboards.leaderboard_name as  courseleaderboardsubcomponents_courseleaderboardsName, enrollements.group_name as  courseleaderboardsubcomponents_enrollementsName,

                          subcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as courseleaderboardsubcomponents_attendanceId, lecturetopics.lectures_topic_id as courseleaderboardsubcomponents_lecturesTopicId, questions.question_id as courseleaderboardsubcomponents_questionId, subcomponentmarks.sub_component_mark_id as courseleaderboardsubcomponents_subComponentMarkId, courseleaderboards.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, enrollements.enrollement_id as courseleaderboardsubcomponents_enrollementId,
                          
                       
                         
                           lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId, 
                        courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage FROM subcomponents LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (lecturetopics.lectures_topic_id = {{id}}  AND  lecturetopics.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET status = 'inactive' WHERE lectures_topic_id = {{id}}"}    

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
                        successMessage: "lecturetopics Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questions (cloid, sub_component_id, question_num, description, question_marks, lectures_topic_id , created_by, updated_by) VALUES ({{questions_cloid}}, {{questions_subComponentId}}, {{questions_questionNum}}, {{questions_description}}, {{questions_questionMarks}}, {{questions_lecturesTopicId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questions SET cloid = {{questions_cloid}}, sub_component_id = {{questions_subComponentId}}, question_num = {{questions_questionNum}}, description = {{questions_description}}, question_marks = {{questions_questionMarks}}, lectures_topic_id = {{questions_lecturesTopicId}} WHERE question_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_id as questions_id,question_id as id, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId  FROM questions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, courseleaderboards.leaderboard_name as  courseleaderboardsubcomponents_courseleaderboardsName, enrollements.group_name as  courseleaderboardsubcomponents_enrollementsName,

                          subcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as courseleaderboardsubcomponents_attendanceId, lecturetopics.lectures_topic_id as courseleaderboardsubcomponents_lecturesTopicId, questions.question_id as courseleaderboardsubcomponents_questionId, subcomponentmarks.sub_component_mark_id as courseleaderboardsubcomponents_subComponentMarkId, courseleaderboards.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, enrollements.enrollement_id as courseleaderboardsubcomponents_enrollementId,
                          
                       
                         
                           questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, 
                        courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage FROM subcomponents LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE questions SET status = 'inactive' WHERE question_id = {{id}}"}    

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
                        successMessage: "questions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponentmarks (sub_component_id, enrollment_id, obtained_marks, out_of_marks , created_by, updated_by) VALUES ({{subcomponentmarks_subComponentId}}, {{subcomponentmarks_enrollmentId}}, {{subcomponentmarks_obtainedMarks}}, {{subcomponentmarks_outOfMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponentmarks SET sub_component_id = {{subcomponentmarks_subComponentId}}, enrollment_id = {{subcomponentmarks_enrollmentId}}, obtained_marks = {{subcomponentmarks_obtainedMarks}}, out_of_marks = {{subcomponentmarks_outOfMarks}} WHERE sub_component_mark_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_mark_id as subcomponentmarks_id,sub_component_mark_id as id, subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks  FROM subcomponentmarks WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, courseleaderboards.leaderboard_name as  courseleaderboardsubcomponents_courseleaderboardsName, enrollements.group_name as  courseleaderboardsubcomponents_enrollementsName,

                          subcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as courseleaderboardsubcomponents_attendanceId, lecturetopics.lectures_topic_id as courseleaderboardsubcomponents_lecturesTopicId, questions.question_id as courseleaderboardsubcomponents_questionId, subcomponentmarks.sub_component_mark_id as courseleaderboardsubcomponents_subComponentMarkId, courseleaderboards.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, enrollements.enrollement_id as courseleaderboardsubcomponents_enrollementId,
                          
                       
                         
                           subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks, 
                        courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage FROM subcomponents LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (subcomponentmarks.sub_component_mark_id = {{id}}  AND  subcomponentmarks.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subcomponentmarks SET status = 'inactive' WHERE sub_component_mark_id = {{id}}"}    

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
                        successMessage: "subcomponentmarks Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsSubcomponents_object}