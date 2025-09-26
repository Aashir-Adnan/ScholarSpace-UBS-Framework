const { executeQuery } = require("../../../Database/queryExecution");;

async function GetUserRoleData(req, decryptedPayload) {
    const query = `
    SELECT
        ur.user_id,
        rdd.role_id,
        ur.user_role_designation_department_id
    FROM
        user_roles_designations_department ur
    JOIN
    	roles_designations_department rdd
        ON ur.role_designation_department_id = rdd.role_designation_department_id
    WHERE
        ur.Status = 'active' AND ur.user_id = ?`;
    const values = [decryptedPayload.user_id];
    const results = await executeQuery(res, query, values);
    return results;
};

module.exports = GetUserRoleData;
