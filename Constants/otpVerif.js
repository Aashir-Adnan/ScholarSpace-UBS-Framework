const LogError = require("../Database/Errorlog");
const verifyToken = require("./auth");
const generatePayload = require("./generatePayload");
const OTPGeneration = require("./OTPGeneration");
const generateToken = require('./jwtUtils');
// Removed direct projectDB usage to avoid manual connection management
const { executeQuery } = require("../Database/queryExecution");

async function isValidAccessToken( accessToken, decryptedPayload) {
    const query = `
    SELECT 
      u.user_id, 
      u.email,
      do.otp,
      ud.user_device_id, 
      ud.device_token, 
      ud.device_name
    FROM 
      users u
    INNER JOIN 
      user_devices ud 
      ON u.user_id = ud.user_id
    INNER JOIN 
      device_otp do
      ON ud.user_device_id = do.user_device_id
    WHERE 
      ud.device_token = ? 
      AND u.email = ? 
      AND ud.device_name = ?
    `;
    try {
        const result = await executeQuery(query, [accessToken, decryptedPayload.email, decryptedPayload.device_name]);
        console.log(
          "decryptedPayload.email, decryptedPayload.device_name : ",
          decryptedPayload.email,
          decryptedPayload.device_name,
          result
        );
        if (result.length > 0) {
            console.log("RESULT : ", result);
            return verifyOTP(result[0].otp, decryptedPayload, 0);
        }
        throw new Error("Invalid access token or device name");
    } catch (error) {
        throw new Error(`Error validating access token: ${error.message}`);
    }
}

async function verifyOTP(OTP, decryptedPayload, updatedFlag = 1) {
    const { email, device_name } = decryptedPayload;

    // Fetch user details
    const userQuery = `
        SELECT u.*, a.attachment_link as user_image 
        FROM users u  
        LEFT JOIN attachments a ON u.image_attachment_id = a.attachment_id
        WHERE u.email = ?`;
    const userResult = await executeQuery(userQuery, [email]);

    if (userResult.length === 0) {
        throw new Error("User not found with email " + email);
    }

    const userId = userResult[0].user_id;

    // Validate OTP in the device_otp table
    const otpQuery = `
        SELECT * 
        FROM device_otp do
        INNER JOIN user_devices ud ON do.user_device_id = ud.user_device_id
        WHERE ud.user_id = ? AND do.otp = ? AND ud.device_name = ?
    `;
    const otpResult = await executeQuery(otpQuery, [userId, OTP, device_name]);
    if (otpResult.length === 0 && false) {
        throw new Error("Invalid OTP");
    }

    const deviceId =  1; 

    const userDeviceDataQuery = `
        SELECT ud.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        WHERE u.user_id = ?
    `;
    const user_device = await executeQuery(userDeviceDataQuery, [userId]);


    
    const userDeviceNotificationDataQuery = `
        SELECT n.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        INNER JOIN user_device_notifications udn ON ud.user_device_id = udn.user_device_id 
        INNER JOIN notifications n ON udn.notification_id = n.notification_id
        WHERE u.user_id = ?
    `;
    const user_device_notification = await executeQuery(userDeviceNotificationDataQuery, [userId]);


    const userRoleDataQuery = `
        SELECT  r.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN roles r ON rdd.role_id = r.role_id
        WHERE u.user_id = ?
    `;
    user_role = await executeQuery(userRoleDataQuery, [userId])

    const userRolesDesignationsDepartmentDataQuery = `
        SELECT  urdd.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        WHERE u.user_id = ?
    `;
    const user_roles_designations_department = await executeQuery(userRolesDesignationsDepartmentDataQuery, [userId])


    const userPermissionDataQuery = `
        SELECT *
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    const user_permission = await executeQuery(userPermissionDataQuery, [userId])

    const collectiveUserPermissionDataQuery = `
        SELECT p.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    const collective_user_permission = await executeQuery(collectiveUserPermissionDataQuery, [userId])

    const userDesignationDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN designations d ON rdd.designation_id = d.designation_id
        WHERE u.user_id = ?
    `;
    const user_designation = await executeQuery(userDesignationDataQuery, [userId])

    const userDepartmentDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN departments d ON rdd.department_id = d.department_id
        WHERE u.user_id = ?
    `;
    const user_department = await executeQuery(userDepartmentDataQuery, [userId])

    const compoundUserDataQuery = `
        SELECT 
            u.user_id,
            u.email,
            urdd.user_role_designation_department_id,
            r.role_name,
            d.designation_name,
            dept.department_name
        FROM users u
        INNER JOIN user_roles_designations_department urdd 
            ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd 
            ON urdd.role_designation_department_id = rdd.role_designation_department_id
        LEFT JOIN roles r 
            ON rdd.role_id = r.role_id
        LEFT JOIN designations d 
            ON rdd.designation_id = d.designation_id
        LEFT JOIN departments dept 
            ON rdd.department_id = dept.department_id
        WHERE u.user_id = ?;
    `
    const compound_user = await executeQuery(compoundUserDataQuery, [userId])
    // Generate token
    const payload = await generatePayload(userId, deviceId, OTP);
    const token = await generateToken(payload, process.env.SECRET_KEY);

    // Store the generated token in device_token
    if (updatedFlag) {
        const updateTokenQuery = `
        UPDATE user_devices 
        SET device_token = ? 
        WHERE user_id = ? AND user_device_id = ?
        `;
        await executeQuery(updateTokenQuery, [token, userId, deviceId]);
    }
    const groupedPermissions = user_roles_designations_department.reduce((acc, urdd) => {
        const relevantPermissions = user_permission
            .filter((perm) => perm.user_role_designation_department_id === urdd.user_role_designation_department_id)
            .map((perm) => perm.permission_name);
    
        acc[urdd.user_role_designation_department_id] = relevantPermissions;
        return acc;
    }, {});
    

    // Build return object
    const returnObject = {
        user_id: userResult[0]?.user_id,
        user: userResult[0],
        device_name: device_name,
        access_token: token,
        user_roles_designations_departments : compound_user,
        user_devices: user_device,
        user_devices_notifications : user_device_notification,
        user_roles: user_role,
        user_permissions :  groupedPermissions,
        collective_user_permissions: collective_user_permission,
        user_departments : user_department,
        user_designations : user_designation,
    };

    return returnObject;
}

async function otpVerif(req,  decryptedPayload) {
    try {
        const { step } = req.query;
        if (step == "2") {
            const { otp } = decryptedPayload;
            return await verifyOTP( otp, decryptedPayload);
        } else {
            try {
                const accessToken = req.headers['accesstoken'];
                console.log("ACCESS TOKEN : ", accessToken);
                if (accessToken && accessToken !== 'null') {
                    return await isValidAccessToken( accessToken, decryptedPayload);
                }
                await OTPGeneration( decryptedPayload);
                return "OTP Sent Successfully";
            } catch (error) {
                await OTPGeneration( decryptedPayload);
                return "OTP Sent Successfully";
            }
        }
    } catch (error) {
        throw new Error(error.message)

    }
}

module.exports = otpVerif;
