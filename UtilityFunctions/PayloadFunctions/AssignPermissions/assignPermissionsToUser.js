const { executeQuery } = require('../../../Database/queryExecution.js');
const LogError = require('../../../Database/Errorlog.js');
const {projectDB} = require('../../../Database/projectDb.js');

const assignPermissionsToUser = async (req, decryptedPayload) => {
    console.log("AssignPermissionsToUser Function Called with Payload:", decryptedPayload);
    try {
        const { user_id, urdd_id, permissions, actionPerformerURDD } = decryptedPayload;
        console.log("check thissss:::::: ",decryptedPayload?.permissions?.Admin?.permissions[0]);
        // Validate required parameters
        if (!urdd_id || !permissions || !actionPerformerURDD) {
            console.log({ urdd_id }, { permissions }, { actionPerformerURDD });
            throw new Error('Missing required parameters: urdd_id, permissions, or actionPerformerURDD');
        }

        // Process each role and its permissions
        const assignedPermissions = [];
        const errors = [];

        for (const [roleName, roleData] of Object.entries(permissions)) {
            if (!roleData.permissions || !Array.isArray(roleData.permissions)) {
                errors.push(`Invalid permissions structure for role: ${roleName}`);
                continue;
            }

            for (const permission of roleData.permissions) {
                try {
                    // Validate permission data
                    if (!permission.permission_id || !permission.permission_name) {
                        errors.push(`Invalid permission data in role ${roleName}: missing permission_id or permission_name`);
                        continue;
                    }

                    // Check if permission already exists for this user
                    const checkExistingQuery = `
                        SELECT user_role_designation_permission_id 
                        FROM user_role_designation_permissions 
                        WHERE user_role_designation_department_id = ? 
                        AND permission_id = ? 
                        AND status != 'inactive'
                    `;
                    const connection2 = await projectDB();
                    const existingResult = await executeQuery(checkExistingQuery, [urdd_id, permission.permission_id], connection2);

                    if (existingResult && existingResult.length > 0) {
                        // Update existing permission
                        const updateQuery = `
                            UPDATE user_role_designation_permissions 
                            SET excluded_id = ?, 
                                included_id = ?, 
                                updated_by = ?, 
                                updated_at = NOW()
                            WHERE user_role_designation_department_id = ? 
                            AND permission_id = ?
                        `;
                        const excludedId = permission.exclude_ids && permission.exclude_ids.length > 0
                            ? JSON.stringify(permission.exclude_ids)
                            : null;
                        const includedId = permission.include_ids && permission.include_ids.length > 0
                            ? JSON.stringify(permission.include_ids)
                            : null;
                        const connection3 = await projectDB();
                        await executeQuery(updateQuery, [
                            excludedId,
                            includedId,
                            actionPerformerURDD,
                            urdd_id,
                            permission.permission_id
                        ], connection3);
                        assignedPermissions.push({
                            role: roleName,
                            permission_id: permission.permission_id,
                            permission_name: permission.permission_name,
                            action: 'updated'
                        });
                    } else {
                        // Insert new permission
                        const insertQuery = `
                            INSERT INTO user_role_designation_permissions 
                            (user_role_designation_department_id, permission_id, excluded_id, included_id, created_by, updated_by) 
                            VALUES (?, ?, ?, ?, ?, ?)
                        `;
                        const excludedId = permission.exclude_ids && permission.exclude_ids.length > 0
                            ? JSON.stringify(permission.exclude_ids)
                            : null;
                        const includedId = permission.include_ids && permission.include_ids.length > 0
                            ? JSON.stringify(permission.include_ids)
                            : null;
                        const connection4 = await projectDB();
                        await executeQuery(insertQuery, [
                            urdd_id,
                            permission.permission_id,
                            excludedId,
                            includedId,
                            actionPerformerURDD,
                            actionPerformerURDD
                        ], connection4);
                        assignedPermissions.push({
                            role: roleName,
                            permission_id: permission.permission_id,
                            permission_name: permission.permission_name,
                            action: 'assigned'
                        });
                    }
                } catch (error) {
                    errors.push(`Error processing permission ${permission.permission_name} in role ${roleName}: ${error.message}`);
                }
            }
        }

        // Return the result
        return {
            success: true,
            user_id: user_id,
            urdd_id: urdd_id,
            assigned_permissions: assignedPermissions,
            errors: errors.length > 0 ? errors : null,
            message: `Successfully processed ${assignedPermissions.length} permissions for User: ${user_id}`
        };

    } catch (error) {
        console.error('Error in assignPermissionsToUser:', error);
        await LogError(null, 500, 'AssignPermissions', error.message, 'E60');
        throw error;
    }
};

module.exports = { assignPermissionsToUser };