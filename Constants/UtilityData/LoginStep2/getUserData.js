const { executeQuery } = require("../../../Database/queryExecution");;

async function handleGetUsersData(req, decryptedPayload){
    const query = `
    SELECT
        u.user_id,
        u.email,
        u.first_name,
        u.last_name,
        u.phone_no,
        u.address,
        u.gender,
        u.cnic,
        u.father_name,
        u.image_attachement_id,
        u.date_of_birth,
        u.blood_group,
    From
        users u
    WHERE
        u.Status="actove" AND user_id=?`;
    const results = await executeQuery(res, query,[decryptedPayload.user_id]);
    let data= results.map(item => ({
        ...item,
        USER_NAME: `${item.first_name} ${item.last_name}`
    }));
    return data
};

module.exports = handleGetUsersData;
