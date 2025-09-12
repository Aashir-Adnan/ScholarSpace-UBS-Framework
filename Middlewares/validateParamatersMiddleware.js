require('../Constants/validateParameters.js')
const LogError = require('../Database/Errorlog.js');
const logMessage = require('../LogFunctions/consoleLog.js');
const validateParametersMiddleware = async (req,  decryptedPayload, apiObject) => {
    try {
        const { config, data } = apiObject;
        const attributeValidations = {};
        let parameters;
        parameters = data.parameters.fields;
        // logMessage("logging decrypted body");
        // console.log("decryptedPayload,parameters", decryptedPayload,parameters);
        // Validate each parameter based on the structure
        if(parameters)
       { for (const paramConfig of parameters) {
            const paramName = paramConfig.name;
            const paramValue = decryptedPayload[paramName] || req.query[paramName];
            // Check if the parameter is required and validate
            if (paramConfig.required && (paramValue === undefined || paramValue === null)) {
                const errorMessage = `Missing required parameter: ${paramName}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }

            // If there are validation functions for the parameter
            if (paramConfig.validations) {
                for (const validationName of paramConfig.validations) {
                    const validationFunction = global[validationName];

                    if (!validationFunction) {
                        const errorMessage = `Validation function not found: ${validationName}`;
                        console.error(errorMessage);
                        throw new Error(errorMessage);

                    }

                    try {
                        validationFunction(req, paramValue);  // Perform validation
                    } catch (validationError) {
                        const errorMessage = `Validation failed for ${paramName}: ${validationError.message}`;
                        throw new Error(errorMessage);
                    }
                }
            }
        }}
    } catch (error) {
        throw new Error(error.message)

    }
};

module.exports = validateParametersMiddleware;
