const generatePayload = require("../../../Constants/generatePayload");
const generateToken = require("../../../Constants/jwtUtils");
const {projectDB} = require("../../../Database/projectDb");
const { executeQuery } = require("../../../Database/queryExecution");


async function loginWithPW(req, decryptedPayload, updatedFlag = 1) {
    const {device_name} = decryptedPayload;
    let objectResolverOutput = decryptedPayload["objectResolverOutput"]
    if (objectResolverOutput.length == 0){
        throw new Error("Incorrect Username or Password")
    }

    let {email} = objectResolverOutput[0]
    let connection = await projectDB();

    // Fetch user details
    const userQuery = `
        SELECT u.*, a.attachment_link as user_image 
        FROM users u  
        LEFT JOIN attachments a ON u.image_attachment_id = a.attachment_id
        WHERE u.email = ?`;
    const userResult = await executeQuery(userQuery, [email], connection);

    if (userResult.length === 0) {
        throw new Error("User not found with email " + email);
    }

    const userId = userResult[0].user_id;


    const userDeviceDataQuery = `
        SELECT ud.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_device = await executeQuery(userDeviceDataQuery, [userId], connection);
    const deviceId = user_device[0].user_device_id;
    
    const userDeviceNotificationDataQuery = `
        SELECT n.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        INNER JOIN user_device_notifications udn ON ud.user_device_id = udn.user_device_id 
        INNER JOIN notifications n ON udn.notification_id = n.notification_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_device_notification = await executeQuery(userDeviceNotificationDataQuery, [userId], connection);


    const userRoleDataQuery = `
        SELECT  r.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN roles r ON rdd.role_id = r.role_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    let user_role = await executeQuery(userRoleDataQuery, [userId], connection)

    const userRolesDesignationsDepartmentDataQuery = `
        SELECT  urdd.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_roles_designations_department = await executeQuery(userRolesDesignationsDepartmentDataQuery, [userId], connection)


    const userPermissionDataQuery = `
        SELECT *
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_permission = await executeQuery(userPermissionDataQuery, [userId], connection)

    const collectiveUserPermissionDataQuery = `
        SELECT p.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const collective_user_permission = await executeQuery(collectiveUserPermissionDataQuery, [userId], connection)

    const userDesignationDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN designations d ON rdd.designation_id = d.designation_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_designation = await executeQuery(userDesignationDataQuery, [userId], connection)

    const userDepartmentDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN departments d ON rdd.department_id = d.department_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_department = await executeQuery(userDepartmentDataQuery, [userId], connection)

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
    connection = await projectDB();
    const compound_user = await executeQuery(compoundUserDataQuery, [userId], connection)
    // Generate token
    const payload = generatePayload(userId);
    const token = await generateToken(payload, process.env.SECRET_KEY);

    // Store the generated token in device_token
    if (updatedFlag) {
        const updateTokenQuery = `
        UPDATE user_devices 
        SET device_token = ? 
        WHERE user_id = ? AND user_device_id = ?
        `;
        connection = await projectDB();
        await executeQuery(updateTokenQuery, [token, userId, deviceId], connection);
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

module.exports = loginWithPW