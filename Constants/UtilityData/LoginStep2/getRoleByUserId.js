const { executeQuery } = require("../../../Database/queryExecution");



async function handleGetRolesByUserIdRequest(req, decryptedPayload){
    let query = `
    SELECT
        rdd.role_id,
        ur.user_role_designation_department_id,
        r.role_name
    FROM
        user_roles_designations_department ur
    LEFT JOIN 
        roles_designations_department rdd ON ur.role_designation_department_id = rdd.role_designation_department_id
    LEFT JOIN 
        roles r ON rdd.role_id = r.role_id
    WHERE 
        ur.user_id = ?`
    ;

    const results = await executeQuery(res, query, [decryptedPayload.user_id]);
    return results
};

module.exports = handleGetRolesByUserIdRequest;
    