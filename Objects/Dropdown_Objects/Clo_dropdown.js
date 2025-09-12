global.CloDropdown_object = {
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
                      parameters: null,
                      apiInfo: {
                      
                        preProcessFunction : [],
                        query: {
                          "queryPayload": "SELECT LEFT(clodomain_name, 10) as label, cloid as value FROM clo where clo.status!='inactive'",
                        },
                        database: "mainDb",
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: "GET",
                        permission: null,
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "clo retrieved successfully!",
                      errorMessage: "Failed to retrieve clo.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { CloDropdown_object }