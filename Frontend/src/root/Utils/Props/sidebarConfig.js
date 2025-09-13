import PersonIcon from '@mui/icons-material/Person';
        import SchoolIcon from "@mui/icons-material/School";
        import DashboardIcon from "@mui/icons-material/Dashboard";
        import GroupIcon from "@mui/icons-material/Group"; 
        import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
        import LockIcon from "@mui/icons-material/Lock";
        import GroupWorkIcon from "@mui/icons-material/GroupWork";
        import EmailIcon from "@mui/icons-material/Email";
        import ArticleIcon from "@mui/icons-material/Article";
        import AccountTreeIcon from '@mui/icons-material/AccountTree';
        import ListAltIcon from '@mui/icons-material/ListAlt';
    
        const iconMapping = {
          "Dashboard" : <DashboardIcon sx={{color: "#FF6347"}}/>,
          "Admins": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Alumni": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Attachments": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Books": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Chat": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Classcomponent": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Clo": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Clomappingplo": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Coursefeedbackform": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Courseleaderboards": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Courseleaderboardsubcomponents": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Courses": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Coursetimetablesschedule": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Course Requests": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Departments": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Designations": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Device Otp": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Disciplines": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Domains": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Employeedomain": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Employeepreferedtimeslots": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Employees": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Enrollements": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Errorlog": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Feedbackform": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Feedbackquestions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Feedbacks": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Institutes": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Institute Domains": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Lecturesattendance": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Lecturetopics": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Notifications": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Permissions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Permission Groups": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Permission Groups Permissions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Plannedcourses": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Platforms": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Platform Versions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Plo": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Prereqs": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Programs": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Questionevaluations": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Questions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Questionssolution": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Questionssolutions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Registereddevices": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Roles": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Roles Designations Department": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Rooms": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Semesters": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Students": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Studentsemesters": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Studentsubmissionattachment": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Studentsubmissions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Subcomponentmarks": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Subcomponents": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Timeslots": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Topicquestions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Users": <GroupIcon sx={{color: "#FF6347"}}/>,
        "User Devices": <GroupIcon sx={{color: "#FF6347"}}/>,
        "User Device Notifications": <GroupIcon sx={{color: "#FF6347"}}/>,
        "User Roles Designations Department": <GroupIcon sx={{color: "#FF6347"}}/>,
        "User Role Designation Permissions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Versions": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Crash Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Email Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Error Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Security Log": <GroupIcon sx={{color: "#FF6347"}}/>,
          "Profile" : <PersonIcon sx={{color: "#FF6347"}}/>,
  
        };
    
        const data = {
          features: {
            sidebarItems: [
              {
                title: "Dashboard",
                icon: iconMapping["Dashboard"],
                permission: ["dashboard","operations_list_attachments"],
                path: "/dashboard",
              },
              
              {
                title: "Admins Management",
                icon: iconMapping["Admins"],
                path: "/Admins-managements/Admins",
                permission: ["view_admins"],
                subNav: [
                  
                      {
                        title: "Admins",
                        path: "/Admins-managements/Admins",
                        permission: ["view_admins"]
                      }
                    
                ]
              },
              {
                title: "Alumni Management",
                icon: iconMapping["Alumni"],
                path: "/Alumni-managements/Alumni",
                permission: ["view_alumni"],
                subNav: [
                  
                      {
                        title: "Alumni",
                        path: "/Alumni-managements/Alumni",
                        permission: ["view_alumni"]
                      }
                    
                ]
              },
              {
                title: "Attachments Management",
                icon: iconMapping["Attachments"],
                path: "/Attachments-managements/Attachments",
                permission: ["view_attachments"],
                subNav: [
                  
                      {
                        title: "Attachments",
                        path: "/Attachments-managements/Attachments",
                        permission: ["view_attachments"]
                      }
                    
                ]
              },
              {
                title: "Books Management",
                icon: iconMapping["Books"],
                path: "/Books-managements/Books",
                permission: ["view_books"],
                subNav: [
                  
                      {
                        title: "Books",
                        path: "/Books-managements/Books",
                        permission: ["view_books"]
                      }
                    
                ]
              },
              {
                title: "Chat Management",
                icon: iconMapping["Chat"],
                path: "/Chat-managements/Chat",
                permission: ["view_chat"],
                subNav: [
                  
                      {
                        title: "Chat",
                        path: "/Chat-managements/Chat",
                        permission: ["view_chat"]
                      }
                    
                ]
              },
              {
                title: "Classcomponent Management",
                icon: iconMapping["Classcomponent"],
                path: "/Classcomponent-managements/Classcomponent",
                permission: ["view_classcomponent"],
                subNav: [
                  
                      {
                        title: "Classcomponent",
                        path: "/Classcomponent-managements/Classcomponent",
                        permission: ["view_classcomponent"]
                      }
                    
                ]
              },
              {
                title: "Clo Management",
                icon: iconMapping["Clo"],
                path: "/Clo-managements/Clo",
                permission: ["view_clo"],
                subNav: [
                  
                      {
                        title: "Clo",
                        path: "/Clo-managements/Clo",
                        permission: ["view_clo"]
                      }
                    
                ]
              },
              {
                title: "Clomappingplo Management",
                icon: iconMapping["Clomappingplo"],
                path: "/Clomappingplo-managements/Clomappingplo",
                permission: ["view_clomappingplo"],
                subNav: [
                  
                      {
                        title: "Clomappingplo",
                        path: "/Clomappingplo-managements/Clomappingplo",
                        permission: ["view_clomappingplo"]
                      }
                    
                ]
              },
              {
                title: "Coursefeedbackform Management",
                icon: iconMapping["Coursefeedbackform"],
                path: "/Coursefeedbackform-managements/Coursefeedbackform",
                permission: ["view_coursefeedbackform"],
                subNav: [
                  
                      {
                        title: "Coursefeedbackform",
                        path: "/Coursefeedbackform-managements/Coursefeedbackform",
                        permission: ["view_coursefeedbackform"]
                      }
                    
                ]
              },
              {
                title: "Courseleaderboards Management",
                icon: iconMapping["Courseleaderboards"],
                path: "/Courseleaderboards-managements/Courseleaderboards",
                permission: ["view_courseleaderboards"],
                subNav: [
                  
                      {
                        title: "Courseleaderboards",
                        path: "/Courseleaderboards-managements/Courseleaderboards",
                        permission: ["view_courseleaderboards"]
                      }
                    
                ]
              },
              {
                title: "Courseleaderboardsubcomponents Management",
                icon: iconMapping["Courseleaderboardsubcomponents"],
                path: "/Courseleaderboardsubcomponents-managements/Courseleaderboardsubcomponents",
                permission: ["view_courseleaderboardsubcomponents"],
                subNav: [
                  
                      {
                        title: "Courseleaderboardsubcomponents",
                        path: "/Courseleaderboardsubcomponents-managements/Courseleaderboardsubcomponents",
                        permission: ["view_courseleaderboardsubcomponents"]
                      }
                    
                ]
              },
              {
                title: "Courses Management",
                icon: iconMapping["Courses"],
                path: "/Courses-managements/Courses",
                permission: ["view_courses"],
                subNav: [
                  
                      {
                        title: "Courses",
                        path: "/Courses-managements/Courses",
                        permission: ["view_courses"]
                      }
                    
                ]
              },
              {
                title: "Coursetimetablesschedule Management",
                icon: iconMapping["Coursetimetablesschedule"],
                path: "/Coursetimetablesschedule-managements/Coursetimetablesschedule",
                permission: ["view_coursetimetablesschedule"],
                subNav: [
                  
                      {
                        title: "Coursetimetablesschedule",
                        path: "/Coursetimetablesschedule-managements/Coursetimetablesschedule",
                        permission: ["view_coursetimetablesschedule"]
                      }
                    
                ]
              },
              {
                title: "Course Requests Management",
                icon: iconMapping["Course Requests"],
                path: "/CourseRequests-managements/Course_requests",
                permission: ["view_course_requests"],
                subNav: [
                  
                      {
                        title: "Course Requests",
                        path: "/CourseRequests-managements/Course_requests",
                        permission: ["view_course_requests"]
                      }
                    
                ]
              },
              {
                title: "Departments Management",
                icon: iconMapping["Departments"],
                path: "/Departments-managements/Departments",
                permission: ["view_departments"],
                subNav: [
                  
                      {
                        title: "Departments",
                        path: "/Departments-managements/Departments",
                        permission: ["view_departments"]
                      }
                    
                ]
              },
              {
                title: "Designations Management",
                icon: iconMapping["Designations"],
                path: "/Designations-managements/Designations",
                permission: ["view_designations"],
                subNav: [
                  
                      {
                        title: "Designations",
                        path: "/Designations-managements/Designations",
                        permission: ["view_designations"]
                      }
                    
                ]
              },
              {
                title: "Device Otp Management",
                icon: iconMapping["Device Otp"],
                path: "/DeviceOtp-managements/Device_otp",
                permission: ["view_device_otp"],
                subNav: [
                  
                      {
                        title: "Device Otp",
                        path: "/DeviceOtp-managements/Device_otp",
                        permission: ["view_device_otp"]
                      }
                    
                ]
              },
              {
                title: "Disciplines Management",
                icon: iconMapping["Disciplines"],
                path: "/Disciplines-managements/Disciplines",
                permission: ["view_disciplines"],
                subNav: [
                  
                      {
                        title: "Disciplines",
                        path: "/Disciplines-managements/Disciplines",
                        permission: ["view_disciplines"]
                      }
                    
                ]
              },
              {
                title: "Domains Management",
                icon: iconMapping["Domains"],
                path: "/Domains-managements/Domains",
                permission: ["view_domains"],
                subNav: [
                  
                      {
                        title: "Domains",
                        path: "/Domains-managements/Domains",
                        permission: ["view_domains"]
                      }
                    
                ]
              },
              {
                title: "Employeedomain Management",
                icon: iconMapping["Employeedomain"],
                path: "/Employeedomain-managements/Employeedomain",
                permission: ["view_employeedomain"],
                subNav: [
                  
                      {
                        title: "Employeedomain",
                        path: "/Employeedomain-managements/Employeedomain",
                        permission: ["view_employeedomain"]
                      }
                    
                ]
              },
              {
                title: "Employeepreferedtimeslots Management",
                icon: iconMapping["Employeepreferedtimeslots"],
                path: "/Employeepreferedtimeslots-managements/Employeepreferedtimeslots",
                permission: ["view_employeepreferedtimeslots"],
                subNav: [
                  
                      {
                        title: "Employeepreferedtimeslots",
                        path: "/Employeepreferedtimeslots-managements/Employeepreferedtimeslots",
                        permission: ["view_employeepreferedtimeslots"]
                      }
                    
                ]
              },
              {
                title: "Employees Management",
                icon: iconMapping["Employees"],
                path: "/Employees-managements/Employees",
                permission: ["view_employees"],
                subNav: [
                  
                      {
                        title: "Employees",
                        path: "/Employees-managements/Employees",
                        permission: ["view_employees"]
                      }
                    
                ]
              },
              {
                title: "Enrollements Management",
                icon: iconMapping["Enrollements"],
                path: "/Enrollements-managements/Enrollements",
                permission: ["view_enrollements"],
                subNav: [
                  
                      {
                        title: "Enrollements",
                        path: "/Enrollements-managements/Enrollements",
                        permission: ["view_enrollements"]
                      }
                    
                ]
              },
              {
                title: "Errorlog Management",
                icon: iconMapping["Errorlog"],
                path: "/Errorlog-managements/Errorlog",
                permission: ["view_errorlog"],
                subNav: [
                  
                      {
                        title: "Errorlog",
                        path: "/Errorlog-managements/Errorlog",
                        permission: ["view_errorlog"]
                      }
                    
                ]
              },
              {
                title: "Feedbackform Management",
                icon: iconMapping["Feedbackform"],
                path: "/Feedbackform-managements/Feedbackform",
                permission: ["view_feedbackform"],
                subNav: [
                  
                      {
                        title: "Feedbackform",
                        path: "/Feedbackform-managements/Feedbackform",
                        permission: ["view_feedbackform"]
                      }
                    
                ]
              },
              {
                title: "Feedbackquestions Management",
                icon: iconMapping["Feedbackquestions"],
                path: "/Feedbackquestions-managements/Feedbackquestions",
                permission: ["view_feedbackquestions"],
                subNav: [
                  
                      {
                        title: "Feedbackquestions",
                        path: "/Feedbackquestions-managements/Feedbackquestions",
                        permission: ["view_feedbackquestions"]
                      }
                    
                ]
              },
              {
                title: "Feedbacks Management",
                icon: iconMapping["Feedbacks"],
                path: "/Feedbacks-managements/Feedbacks",
                permission: ["view_feedbacks"],
                subNav: [
                  
                      {
                        title: "Feedbacks",
                        path: "/Feedbacks-managements/Feedbacks",
                        permission: ["view_feedbacks"]
                      }
                    
                ]
              },
              {
                title: "Institutes Management",
                icon: iconMapping["Institutes"],
                path: "/Institutes-managements/Institutes",
                permission: ["view_institutes"],
                subNav: [
                  
                      {
                        title: "Institutes",
                        path: "/Institutes-managements/Institutes",
                        permission: ["view_institutes"]
                      }
                    
                ]
              },
              {
                title: "Institute Domains Management",
                icon: iconMapping["Institute Domains"],
                path: "/InstituteDomains-managements/Institute_domains",
                permission: ["view_institute_domains"],
                subNav: [
                  
                      {
                        title: "Institute Domains",
                        path: "/InstituteDomains-managements/Institute_domains",
                        permission: ["view_institute_domains"]
                      }
                    
                ]
              },
              {
                title: "Lecturesattendance Management",
                icon: iconMapping["Lecturesattendance"],
                path: "/Lecturesattendance-managements/Lecturesattendance",
                permission: ["view_lecturesattendance"],
                subNav: [
                  
                      {
                        title: "Lecturesattendance",
                        path: "/Lecturesattendance-managements/Lecturesattendance",
                        permission: ["view_lecturesattendance"]
                      }
                    
                ]
              },
              {
                title: "Lecturetopics Management",
                icon: iconMapping["Lecturetopics"],
                path: "/Lecturetopics-managements/Lecturetopics",
                permission: ["view_lecturetopics"],
                subNav: [
                  
                      {
                        title: "Lecturetopics",
                        path: "/Lecturetopics-managements/Lecturetopics",
                        permission: ["view_lecturetopics"]
                      }
                    
                ]
              },
              {
                title: "Notifications Management",
                icon: iconMapping["Notifications"],
                path: "/Notifications-managements/Notifications",
                permission: ["view_notifications"],
                subNav: [
                  
                      {
                        title: "Notifications",
                        path: "/Notifications-managements/Notifications",
                        permission: ["view_notifications"]
                      }
                    
                ]
              },
              {
                title: "Permissions Management",
                icon: iconMapping["Permissions"],
                path: "/Permissions-managements/Permissions",
                permission: ["view_permissions"],
                subNav: [
                  
                      {
                        title: "Permissions",
                        path: "/Permissions-managements/Permissions",
                        permission: ["view_permissions"]
                      }
                    
                ]
              },
              {
                title: "Permission Groups Management",
                icon: iconMapping["Permission Groups"],
                path: "/PermissionGroups-managements/Permission_groups",
                permission: ["view_permission_groups"],
                subNav: [
                  
                      {
                        title: "Permission Groups",
                        path: "/PermissionGroups-managements/Permission_groups",
                        permission: ["view_permission_groups"]
                      }
                    
                ]
              },
              {
                title: "Permission Groups Permissions Management",
                icon: iconMapping["Permission Groups Permissions"],
                path: "/PermissionGroupsPermissions-managements/Permission_groups_permissions",
                permission: ["view_permission_groups_permissions"],
                subNav: [
                  
                      {
                        title: "Permission Groups Permissions",
                        path: "/PermissionGroupsPermissions-managements/Permission_groups_permissions",
                        permission: ["view_permission_groups_permissions"]
                      }
                    
                ]
              },
              {
                title: "Plannedcourses Management",
                icon: iconMapping["Plannedcourses"],
                path: "/Plannedcourses-managements/Plannedcourses",
                permission: ["view_plannedcourses"],
                subNav: [
                  
                      {
                        title: "Plannedcourses",
                        path: "/Plannedcourses-managements/Plannedcourses",
                        permission: ["view_plannedcourses"]
                      }
                    
                ]
              },
              {
                title: "Platforms Management",
                icon: iconMapping["Platforms"],
                path: "/Platforms-managements/Platforms",
                permission: ["view_platforms"],
                subNav: [
                  
                      {
                        title: "Platforms",
                        path: "/Platforms-managements/Platforms",
                        permission: ["view_platforms"]
                      }
                    
                ]
              },
              {
                title: "Platform Versions Management",
                icon: iconMapping["Platform Versions"],
                path: "/PlatformVersions-managements/Platform_versions",
                permission: ["view_platform_versions"],
                subNav: [
                  
                      {
                        title: "Platform Versions",
                        path: "/PlatformVersions-managements/Platform_versions",
                        permission: ["view_platform_versions"]
                      }
                    
                ]
              },
              {
                title: "Plo Management",
                icon: iconMapping["Plo"],
                path: "/Plo-managements/Plo",
                permission: ["view_plo"],
                subNav: [
                  
                      {
                        title: "Plo",
                        path: "/Plo-managements/Plo",
                        permission: ["view_plo"]
                      }
                    
                ]
              },
              {
                title: "Prereqs Management",
                icon: iconMapping["Prereqs"],
                path: "/Prereqs-managements/Prereqs",
                permission: ["view_prereqs"],
                subNav: [
                  
                      {
                        title: "Prereqs",
                        path: "/Prereqs-managements/Prereqs",
                        permission: ["view_prereqs"]
                      }
                    
                ]
              },
              {
                title: "Programs Management",
                icon: iconMapping["Programs"],
                path: "/Programs-managements/Programs",
                permission: ["view_programs"],
                subNav: [
                  
                      {
                        title: "Programs",
                        path: "/Programs-managements/Programs",
                        permission: ["view_programs"]
                      }
                    
                ]
              },
              {
                title: "Questionevaluations Management",
                icon: iconMapping["Questionevaluations"],
                path: "/Questionevaluations-managements/Questionevaluations",
                permission: ["view_questionevaluations"],
                subNav: [
                  
                      {
                        title: "Questionevaluations",
                        path: "/Questionevaluations-managements/Questionevaluations",
                        permission: ["view_questionevaluations"]
                      }
                    
                ]
              },
              {
                title: "Questions Management",
                icon: iconMapping["Questions"],
                path: "/Questions-managements/Questions",
                permission: ["view_questions"],
                subNav: [
                  
                      {
                        title: "Questions",
                        path: "/Questions-managements/Questions",
                        permission: ["view_questions"]
                      }
                    
                ]
              },
              {
                title: "Questionssolution Management",
                icon: iconMapping["Questionssolution"],
                path: "/Questionssolution-managements/Questionssolution",
                permission: ["view_questionssolution"],
                subNav: [
                  
                      {
                        title: "Questionssolution",
                        path: "/Questionssolution-managements/Questionssolution",
                        permission: ["view_questionssolution"]
                      }
                    
                ]
              },
              {
                title: "Questionssolutions Management",
                icon: iconMapping["Questionssolutions"],
                path: "/Questionssolutions-managements/Questionssolutions",
                permission: ["view_questionssolutions"],
                subNav: [
                  
                      {
                        title: "Questionssolutions",
                        path: "/Questionssolutions-managements/Questionssolutions",
                        permission: ["view_questionssolutions"]
                      }
                    
                ]
              },
              {
                title: "Registereddevices Management",
                icon: iconMapping["Registereddevices"],
                path: "/Registereddevices-managements/Registereddevices",
                permission: ["view_registereddevices"],
                subNav: [
                  
                      {
                        title: "Registereddevices",
                        path: "/Registereddevices-managements/Registereddevices",
                        permission: ["view_registereddevices"]
                      }
                    
                ]
              },
              {
                title: "Roles Management",
                icon: iconMapping["Roles"],
                path: "/Roles-managements/Roles",
                permission: ["view_roles"],
                subNav: [
                  
                      {
                        title: "Roles",
                        path: "/Roles-managements/Roles",
                        permission: ["view_roles"]
                      }
                    
                ]
              },
              {
                title: "Roles Designations Department Management",
                icon: iconMapping["Roles Designations Department"],
                path: "/RolesDesignationsDepartment-managements/Roles_designations_department",
                permission: ["view_roles_designations_department"],
                subNav: [
                  
                      {
                        title: "Roles Designations Department",
                        path: "/RolesDesignationsDepartment-managements/Roles_designations_department",
                        permission: ["view_roles_designations_department"]
                      }
                    
                ]
              },
              {
                title: "Rooms Management",
                icon: iconMapping["Rooms"],
                path: "/Rooms-managements/Rooms",
                permission: ["view_rooms"],
                subNav: [
                  
                      {
                        title: "Rooms",
                        path: "/Rooms-managements/Rooms",
                        permission: ["view_rooms"]
                      }
                    
                ]
              },
              {
                title: "Semesters Management",
                icon: iconMapping["Semesters"],
                path: "/Semesters-managements/Semesters",
                permission: ["view_semesters"],
                subNav: [
                  
                      {
                        title: "Semesters",
                        path: "/Semesters-managements/Semesters",
                        permission: ["view_semesters"]
                      }
                    
                ]
              },
              {
                title: "Students Management",
                icon: iconMapping["Students"],
                path: "/Students-managements/Students",
                permission: ["view_students"],
                subNav: [
                  
                      {
                        title: "Students",
                        path: "/Students-managements/Students",
                        permission: ["view_students"]
                      }
                    
                ]
              },
              {
                title: "Studentsemesters Management",
                icon: iconMapping["Studentsemesters"],
                path: "/Studentsemesters-managements/Studentsemesters",
                permission: ["view_studentsemesters"],
                subNav: [
                  
                      {
                        title: "Studentsemesters",
                        path: "/Studentsemesters-managements/Studentsemesters",
                        permission: ["view_studentsemesters"]
                      }
                    
                ]
              },
              {
                title: "Studentsubmissionattachment Management",
                icon: iconMapping["Studentsubmissionattachment"],
                path: "/Studentsubmissionattachment-managements/Studentsubmissionattachment",
                permission: ["view_studentsubmissionattachment"],
                subNav: [
                  
                      {
                        title: "Studentsubmissionattachment",
                        path: "/Studentsubmissionattachment-managements/Studentsubmissionattachment",
                        permission: ["view_studentsubmissionattachment"]
                      }
                    
                ]
              },
              {
                title: "Studentsubmissions Management",
                icon: iconMapping["Studentsubmissions"],
                path: "/Studentsubmissions-managements/Studentsubmissions",
                permission: ["view_studentsubmissions"],
                subNav: [
                  
                      {
                        title: "Studentsubmissions",
                        path: "/Studentsubmissions-managements/Studentsubmissions",
                        permission: ["view_studentsubmissions"]
                      }
                    
                ]
              },
              {
                title: "Subcomponentmarks Management",
                icon: iconMapping["Subcomponentmarks"],
                path: "/Subcomponentmarks-managements/Subcomponentmarks",
                permission: ["view_subcomponentmarks"],
                subNav: [
                  
                      {
                        title: "Subcomponentmarks",
                        path: "/Subcomponentmarks-managements/Subcomponentmarks",
                        permission: ["view_subcomponentmarks"]
                      }
                    
                ]
              },
              {
                title: "Subcomponents Management",
                icon: iconMapping["Subcomponents"],
                path: "/Subcomponents-managements/Subcomponents",
                permission: ["view_subcomponents"],
                subNav: [
                  
                      {
                        title: "Subcomponents",
                        path: "/Subcomponents-managements/Subcomponents",
                        permission: ["view_subcomponents"]
                      }
                    
                ]
              },
              {
                title: "Timeslots Management",
                icon: iconMapping["Timeslots"],
                path: "/Timeslots-managements/Timeslots",
                permission: ["view_timeslots"],
                subNav: [
                  
                      {
                        title: "Timeslots",
                        path: "/Timeslots-managements/Timeslots",
                        permission: ["view_timeslots"]
                      }
                    
                ]
              },
              {
                title: "Topicquestions Management",
                icon: iconMapping["Topicquestions"],
                path: "/Topicquestions-managements/Topicquestions",
                permission: ["view_topicquestions"],
                subNav: [
                  
                      {
                        title: "Topicquestions",
                        path: "/Topicquestions-managements/Topicquestions",
                        permission: ["view_topicquestions"]
                      }
                    
                ]
              },
              {
                title: "Users Management",
                icon: iconMapping["Users"],
                path: "/Users-managements/Users",
                permission: ["view_users"],
                subNav: [
                  
                      {
                        title: "Users",
                        path: "/Users-managements/Users",
                        permission: ["view_users"]
                      }
                    
                ]
              },
              {
                title: "User Devices Management",
                icon: iconMapping["User Devices"],
                path: "/UserDevices-managements/User_devices",
                permission: ["view_user_devices"],
                subNav: [
                  
                      {
                        title: "User Devices",
                        path: "/UserDevices-managements/User_devices",
                        permission: ["view_user_devices"]
                      }
                    
                ]
              },
              {
                title: "User Device Notifications Management",
                icon: iconMapping["User Device Notifications"],
                path: "/UserDeviceNotifications-managements/User_device_notifications",
                permission: ["view_user_device_notifications"],
                subNav: [
                  
                      {
                        title: "User Device Notifications",
                        path: "/UserDeviceNotifications-managements/User_device_notifications",
                        permission: ["view_user_device_notifications"]
                      }
                    
                ]
              },
              {
                title: "User Roles Designations Department Management",
                icon: iconMapping["User Roles Designations Department"],
                path: "/UserRolesDesignationsDepartment-managements/User_roles_designations_department",
                permission: ["view_user_roles_designations_department"],
                subNav: [
                  
                      {
                        title: "User Roles Designations Department",
                        path: "/UserRolesDesignationsDepartment-managements/User_roles_designations_department",
                        permission: ["view_user_roles_designations_department"]
                      }
                    
                ]
              },
              {
                title: "User Role Designation Permissions Management",
                icon: iconMapping["User Role Designation Permissions"],
                path: "/UserRoleDesignationPermissions-managements/User_role_designation_permissions",
                permission: ["view_user_role_designation_permissions"],
                subNav: [
                  
                      {
                        title: "User Role Designation Permissions",
                        path: "/UserRoleDesignationPermissions-managements/User_role_designation_permissions",
                        permission: ["view_user_role_designation_permissions"]
                      }
                    
                ]
              },
              {
                title: "Versions Management",
                icon: iconMapping["Versions"],
                path: "/Versions-managements/Versions",
                permission: ["view_versions"],
                subNav: [
                  
                      {
                        title: "Versions",
                        path: "/Versions-managements/Versions",
                        permission: ["view_versions"]
                      }
                    
                ]
              },
              {
                title: "Crash Log Management",
                icon: iconMapping["Crash Log"],
                path: "/CrashLog-managements/Crash_log",
                permission: ["view_crash_log"],
                subNav: [
                  
                      {
                        title: "Crash Log",
                        path: "/CrashLog-managements/Crash_log",
                        permission: ["view_crash_log"]
                      }
                    
                ]
              },
              {
                title: "Email Log Management",
                icon: iconMapping["Email Log"],
                path: "/EmailLog-managements/Email_log",
                permission: ["view_email_log"],
                subNav: [
                  
                      {
                        title: "Email Log",
                        path: "/EmailLog-managements/Email_log",
                        permission: ["view_email_log"]
                      }
                    
                ]
              },
              {
                title: "Error Log Management",
                icon: iconMapping["Error Log"],
                path: "/ErrorLog-managements/Error_log",
                permission: ["view_error_log"],
                subNav: [
                  
                      {
                        title: "Error Log",
                        path: "/ErrorLog-managements/Error_log",
                        permission: ["view_error_log"]
                      }
                    
                ]
              },
              {
                title: "Security Log Management",
                icon: iconMapping["Security Log"],
                path: "/SecurityLog-managements/Security_log",
                permission: ["view_security_log"],
                subNav: [
                  
                      {
                        title: "Security Log",
                        path: "/SecurityLog-managements/Security_log",
                        permission: ["view_security_log"]
                      }
                    
                ]
              }
              ,
              {
                title: "Profile",
                icon: iconMapping["Profile"],
                path: "/profile/account",
                permission: ["profile","operations_account"],
                subNav: [
                  {
                    title: "Account",
                    path: "/profile/account",
                    permission: ["account","operations_account"],
                  },
                  {
                    title: "Security",
                    path: "/profile/security",
                    permission: ["security","operations_security"],
                  },
                  {
                    title: "Privacy Policy",
                    path: "/profile/privacy-policy",
                    permission: ["privacy_policy","operations_privacy_policy"],
                  },
                ],
              },
            ]
          },
          onSelect: (selectedTab) => { console.log(selectedTab); },
        };
    
        const config = {
          viewMode: {
            presentation: ["sidebar", "collapsible"],
            mode: ["view", "edit"],
            isOpen: true,
            mobileBreakpoint: "(max-width:768px)",
          },
          features: {
            tokenAuthentication: true,
            permission: true,
          },
        };
    
      const appearance = {
              features: {
                styling: {
                  background: "#f5f5f5",
                  width: "280px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  logoWidth: "120px",
                  logoHeight: "80px",
                  fontSize: "14px",
                  fontSizeSmall: "13px",
                  fontWeight: 500,
                  activeFontWeight: 600,
                  borderRadius: "8px",
                  light: {
                    background: "#f5f5f5",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    activeTextColor: "#4C49ED",
                    inactiveTextColor: "#5C5B98",
                    activeBackgroundColor: "rgba(76, 73, 237, 0.12)",
                    hoverBackgroundColor: "rgba(76, 73, 237, 0.08)",
                    accentColor: "#4C49ED",
                    secondaryAccentColor: "#FF6347",
                  },
                  dark: {
                    background: "#1E1E2F",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
                    activeTextColor: "#C7C6FF",
                    inactiveTextColor: "#A5A4C4",
                    activeBackgroundColor: "rgba(76, 73, 237, 0.25)",
                    hoverBackgroundColor: "rgba(76, 73, 237, 0.15)",
                    accentColor: "#6C63FF",
                    secondaryAccentColor: "#FF8571",
                  },
                },
              },
        };  
        export { data, config, appearance };