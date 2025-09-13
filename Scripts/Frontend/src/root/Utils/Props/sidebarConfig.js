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
          "Crash Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Email Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Error Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "Security Log": <GroupIcon sx={{color: "#FF6347"}}/>,
        "User Devices": <GroupIcon sx={{color: "#FF6347"}}/>,
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