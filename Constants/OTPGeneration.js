const otpGenerator = require('otp-generator');
const sendEmail = require('./sendEmailOTP');
const getDateTime = require('./getDateTime');
// Removed direct projectDB usage to avoid manual connection management
const { executeQuery } = require('../Database/queryExecution');
const logMessage = require('../LogFunctions/consoleLog');

async function OTPGeneration( decryptedPayload) {
  try{
    let deviceId, otpResult;
    let {device_name, platform_version, email, device_identifier, os_version} = decryptedPayload
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
    
    const [currentDateString, currentTimeString, currentDateTime] = getDateTime();

    const userQuery = `SELECT user_id FROM users WHERE email = ?`;
    const userResult = await executeQuery(userQuery, [email]);
    if (userResult.length === 0) {
      throw new Error("User not found with email " + email);
    }

    const userId = userResult[0].user_id;

    const deviceIdQuery = `
      SELECT * 
      FROM user_devices 
      WHERE user_id = ?
    `;
    
    const deviceResult = await executeQuery(deviceIdQuery, [userId]);
    console.log(deviceResult);
    if (deviceResult.length === 0) {
        const insertDeviceQuery = `
            INSERT INTO user_devices (user_id, device_token, device_name, platform_version_id, os_version)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const insertDeviceResult = await executeQuery(insertDeviceQuery, [userId, null,  device_name, 1, device_name + " " + os_version]);
        deviceId = insertDeviceResult.insertId;

        const otpQuery = `  
          INSERT INTO device_otp (user_device_id, otp, otp_failure_count)
          VALUES (?,?,?)
        `;
        
        otpResult = await executeQuery(otpQuery, [deviceId, OTP, 0]);
    } else {
        deviceId = deviceResult[0]?.user_device_id;
        const checkDeviceOtp =  `SELECT * FROM device_otp WHERE user_device_id = ?`
        let checkResults = await executeQuery(checkDeviceOtp, [deviceId]);
        if (checkResults.length == 0){
          const insertDevice = `
            INSERT INTO device_otp (user_device_id, otp, otp_failure_count) VALUES (?,?,?)
          `
          await executeQuery(insertDevice, [deviceId, null, 0]);
        }
        const otpQuery = `
          UPDATE device_otp
          SET otp = ?
          WHERE user_device_id = ?
        `;
        
        otpResult = await executeQuery(otpQuery, [OTP, deviceId]);

    }

    if (otpResult.affectedRows === 0 && !otpResult.insertId ) {
      console.log(otpResult)
      throw new Error("Failed to assign OTP. Device not associated with the user or invalid device ID.");
    }

    await sendEmail(email, OTP);

    return OTP;
  }
  catch (error){
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = OTPGeneration;
