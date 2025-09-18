const { executeStudentDataQueries } = require("../../../../UtilityFunctions/PayloadFunctions/StudentDashboard/getStudentDashboardInfo")

global.StudentDashboard_object = {
    "versions": {
      "versionData": [{
        "*": {
          "steps":[
            {
            "config": {
              "features": {
                "multistep": false,
                "parameters": false,
                "pagination": false,
              },
              "communication": {
                "encryption": {
                  "platformEncryption": true,
                  "accessToken": true
                },
                // "encryption": false

              },
              "verification" : {
                  "otp" : false,
                  "accessToken" : false
              }
            },
            "data": {
              "parameters": {
                "fields": 
                  [
                  ]
              },
              "apiInfo": 
                {
                  "query": {
                    "queryNature": "",
                    "queryPayload": "",
                    "database" : "projectDB"
                  },
                  "utilityFunctions": {
                    "callbackFunction": null,
                    "payloadFunction": [executeStudentDataQueries],
                    "crudFunction" : "crudApiGenerator"
                  }
                }
              ,
              "requestMetaData": {
                "requestMethod": {"List" : "GET", "View" : "GET"},
                "permission": null,
                "pagination": {
                  "pageSize": 10
                }
              }
            },
            "response": {
              "successMessage": "Configuration generated successfully!",
              "errorMessage": "There was an error generating the configuration."
            }
            },
            ]
        },
      }]
    }
  }
  module.exports = {StudentDashboard_object}