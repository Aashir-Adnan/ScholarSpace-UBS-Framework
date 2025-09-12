const validateToken = require("./validateToken.js");
const permissionChecker = require("./permissionChecker.js");
const validateParametersMiddleware = require("./validateParamatersMiddleware.js");
const otpVerif = require("../Constants/otpVerif.js");
const objectResolver = require("./objectResolver.js");
const handleVersionChecking = require("./versionChecker.js");
const handleEncryption = require("./platformEncryption.js");
const LogError = require("../Database/Errorlog"); // Import the LogError function
const sendResponse = require("../Constants/response.js");
const { encryptObject } = require("../Encryption/aes.js");
const logMessage = require("../LogFunctions/consoleLog.js");
const apiObjectGenerator = require("../HelperFunctions/ApiObjectsGenerator.js");
const fileHandler = require("../FileHandling/fileHandler.js");
const getPlatformConfig = require("./platformHandler.js").getPlatformConfig;
const generateToken = require('../Constants/jwtUtils');
const {
  selectFilter,
} = require("../UtilityFunctions/PreProcessingFunctions/selectFilter.js");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const reqProcessFuncs = [selectFilter];
const middlewareHandler = async (req, res, next) => {
  try {
    console.log(
      "============================================================================================"
    );
    let payload = {},
      PlatformName,
      PlatformVersion;
    let platformIP = req.ip;
    console.log("PLATFORM IP : ", platformIP); //for localhost it will be ::1

    const requestedPath = req.path.replace("/api/", "");
    const pathParts = requestedPath.split("/");
    console.log("RECIEVED HIT ON : ", req.path);
    const objectName =
      pathParts.length >= 2
        ? pathParts
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each segment
          .reduce((acc, curr, index) => {
            if (index === 0) return acc; // Skip the first segment
            return acc + curr; // Concatenate segments
          }, pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)) +
        "_object" // Start with the second segment
        : "InvalidPath"; // Handle cases with less than 2 segments
    const apiObject = global[objectName];
    let permission_results;

    if (!apiObject) {
      console.log("ObjectName: ", objectName);
      await LogError(
        res,
        404,
        "API Object Resolver ",
        `API Object not found for path: ${requestedPath}`,
        "E50"
      );
      console.log(
        "============================================================================================"
      );
      return;
    }
    let { platform, data, response, config } = await handleVersionChecking(
      req,
      apiObject
    );
    
    platform ? config = getPlatformConfig(platform, PlatformName, platformIP) : config = config;

    if (!config) { 
      await LogError(
        res,
        400, 
        "Platform Validator ", 
        "This API does not support this platform.", 
        "E51"
      ); 
      console.log("============================================================================================"); 
      return; 
    }
    if (data?.apiInfo?.utilityFunctions?.crudFunction == "crudApiGenerator") {
      const generatedApiObject = await apiObjectGenerator(
        config,
        data,
        response,
        req
      );
      ({ config, data, response } = generatedApiObject);
    }

    let decryptedPayload = req.body;
    let encryptionKey = null;
    console.log(
      "data.requestMetaData.requestMethod",
      data.requestMetaData.requestMethod
    );

    if (req.method !== data.requestMetaData.requestMethod) {
      await LogError(
        res,
        405,
        "Req Method Resolver ",
        `Incorrect Request Method`,
        "E52"
      );
      console.log(
        "============================================================================================"
      );
      return;
    }

    if (config.communication.encryption) {
      ({ decryptedPayload, encryptionKey, PlatformName, PlatformVersion } =
        await handleEncryption(req, { config, data, response }));
    }

    for (const func of reqProcessFuncs) {
      await func(req, decryptedPayload);
    }

    console.log("DECRYPTED PAYLOAD : ", decryptedPayload);
    if (config.verification.accessToken) {
      try {
        const tokenResults = await validateToken(
          req,
          res,
          decryptedPayload,
          PlatformName,
          PlatformVersion
        );
        console.log("TOKEN RESULTS : ", tokenResults);
        ({ userId, deviceId,decodedToken } = tokenResults);

        const updatedToken = await generateToken(decodedToken, process.env.SECRET_KEY);
        payload.accessToken = updatedToken;


      } catch (error) {
        await LogError(
          res,
          401,
          "Access Token Validator ",
          error.message,
          "E40"
        );
        console.log(
          "============================================================================================"
        );
        return;
      }
    }

    if (config.verification.otp) {
      try {
        payload.otpVerif = await otpVerif(req, decryptedPayload);
      } catch (error) {
        await LogError(
          res,
          401,
          "OTP Verification Failed ",
          error.message,
          "E42"
        );
        console.log(
          "============================================================================================"
        );
        return;
      }
    }

    if (data.requestMetaData.permission) {
      try {
        permission_results = await permissionChecker(
          req,
          data,
          decryptedPayload,
          requestedPath
        );
      } catch (error) {
        await LogError(res, 405, "Permission Validator ", error.message, "E31");
        console.log(
          "============================================================================================"
        );
        return;
      }
    }
    if (data.apiInfo?.preProcessFunction?.length > 0) {
      for (let util of data.apiInfo.preProcessFunction) {
        decryptedPayload[util.name] = await util(req, decryptedPayload);
      }
    }
    if (config.file) {
      try {
        await fileHandler(req, res, config.file);
        console.log(
          "============================================================================================"
        );
        return;
      } catch (error) {
        console.log(error);
        await LogError(
          res,
          500,
          "File Handler Execution Failed",
          error.message,
          "E22"
        );
        console.log(
          "============================================================================================"
        );
        return;
      }
    }

    if (data.parameters) {
      try {
        await validateParametersMiddleware(req, decryptedPayload, {
          config,
          data,
          response,
        });
      } catch (error) {
        await LogError(
          res,
          400,
          "Parameter Validation Failed ",
          error.message,
          "E10"
        );
        console.log(
          "============================================================================================"
        );
        return;
      }
    }

    if (data.apiInfo.utilityFunctions.callbackFunction) {
      try {
        data.apiInfo.utilityFunctions.callbackFunction(
          req,
          res,
          decryptedPayload,
          encryptionKey
        );
        return;
      } catch (error) {
        await LogError(
          res,
          500,
          "Callback Function Execution failed ",
          error.message,
          "E22"
        );
        console.log(
          "============================================================================================"
        );
        return;
      }
    } else {
      let objectResolverOutput;
      try {
        objectResolverOutput = await objectResolver(
          req,
          decryptedPayload,
          { config, data, response },
          permission_results
        );
        console.log("Object Resolver Output: ", objectResolverOutput?.results);
        decryptedPayload["objectResolverOutput"] =
          objectResolverOutput?.results;
      } catch (error) {
        console.log(error);
        await LogError(
          res,
          500,
          "Object Resolution Failed ",
          error.message,
          "E22"
        );
        console.log(
          "============================================================================================"
        );
        return;
      }
      if (data.apiInfo.utilityFunctions.payloadFunction.length > 0) {
        for (const util of data.apiInfo.utilityFunctions.payloadFunction) {
          try {
            const functionName = util.name;
            payload[functionName] = await util(req, decryptedPayload);
            decryptedPayload.functionName = payload[functionName];
          } catch (error) {
            await LogError(
              res,
              500,
              "Payload Function Execution Failed ",
              error.message,
              "E24"
            );
            console.log(
              "============================================================================================"
            );
            return;
          }
        }
      }
      if (data.apiInfo?.postProcessFunction) {
        const postProcessFunc = data.apiInfo.postProcessFunction;
        payload = await postProcessFunc(req, decryptedPayload);
      } else {
        payload.return = objectResolverOutput?.results;
        payload.total_count = objectResolverOutput?.total_count;
      }
    }
    if (config.communication.encryption) {
      try {
        await sendResponse(
          res,
          200,
          "API Hit Successfully",
          encryptObject(payload, encryptionKey)
        );
      } catch (error) {
        await LogError(res, 500, "Encryption Failed ", error.message, "E24");
        console.log(
          "============================================================================================"
        );
        return;
      }
    } else {
      sendResponse(
        res,
        200,
        `API Hit Successfully: ${response.successMessage}`,
        payload
      );
    }
    console.log(
      "============================================================================================"
    );
  } catch (error) {
    console.log(error);
    await LogError(res, 500, "Middleware Handler", error.message, null);
    return
  }
};

module.exports = { middlewareHandler };
