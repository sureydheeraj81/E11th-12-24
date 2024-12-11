require("dotenv").config();
const SMSClass = require("./SMSClass");
const Registration = require("../models/registrationFormModel");
const sms = new SMSClass();

const options = {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};
let currentTime = new Date().toLocaleString("en-IN", options);
const getotp = (length = 6) => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


let otp = "";
exports.sendOtp = async (req, res) => {
  const peid = process.env.PEID;
  const templateID = process.env.TEMPLATEID;

  const { mobile_no, region } = req.body;
  otp = getotp(6);
  const msg = `Your OTP (One time password) for CORS Registration Portal is ${otp} - Team CORS GRB`;



  try {
    const otpdata = await Registration.findOne({
      where: { mobile_no, region, is_rejected: "Approved" },
    });
    if (!otpdata) {
      let date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      const otpExpiry = date.toLocaleString("en-IN", options);

      const response = await sms.send_sms(
        mobile_no,
        msg,
        peid,
        templateID
      );

      return res
        .status(200)
        .json({
          message: `New OTP has been sent to your mobile no ${mobile_no}`,
          response,
          otp,
          otpExpiry,
          success: true,
        });
    } else if (otpdata.mobile_no && !otpdata.region) {
      let date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      const otpExpiry = date.toLocaleString("en-IN", options);

      const response = await sms.send_sms(
        mobile_no,
        sms_texts,
        peid,
        templateID
      );

      return res
        .status(200)
        .json({
          message: `New OTP has been sent to your mobile no ${mobile_no}`,
          response,
          otp,
          otpExpiry,
          success: true,
        });
    } else {
      return res
        .status(400)
        .json({
          message: `This mobile number is already registered for ${region}!!!`,
          success: false,
        });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { userEnteredOtp, mobile_no } = req.body;

  try {
    if (otp !== userEnteredOtp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again.", success: false });
    }

    // let otpExpiryTime = new Date();
    // otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5);
    // const currentTime = new Date();
    // if (currentTime > otpExpiryTime) {
    //   return res.status(400).json({ message: "OTP has expired. Please request a new one.", success: false });
    // }

    return res.status(200).json({ message: "OTP verified successfully.", success: true });

  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error });
  }
};




const subsgetotp = (length = 6) => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
let subsotp = "";
exports.subsOtp = async (req, res) => {
  const peid = process.env.PEID;
  const templateID = process.env.TEMPLATEID;

  const { mobile_no, region } = req.body;
  subsotp = subsgetotp(6);
  const sms_texts = `Your OTP (One time password) for CORS Registration Portal is ${subsotp} - Team CORS GRB`;

  try {

    const otpdata = await Registration.findOne({ where: { mobile_no, region,is_rejected:'Approved' } });


    if (otpdata) {
      let date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      const otpExpiry = date.toLocaleString("en-IN", options);

      const response = await sms.send_sms(
        mobile_no,
        sms_texts,
        peid,
        templateID
      );

      return res
        .status(200)
        .json({
          message: `New OTP has been sent to your mobile no ${mobile_no}`,
          response,
          subsotp,
          otpdata,
          otpExpiry,
          success: true,
        });
    }
    if(!otpdata){
      return res.status(400).json({ message: "Mobile number not found",success:false });
    }
    return res.status(400).json({
      message: "Mobile number not found or not registered in the specified region",
      success: false,
    })

  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP", success: false, });
  }
};

exports.SubsRegMob = async () => {
  try {
    const datas = await Registration.findAll();
    if (datas) {
      return res.status(200).json({ message: "Mobile number already registered", success: true, data: datas })
    }
    return res.status(400).json({ message: "Mobile number not found or not registered", success: false })
  } catch (error) {
    res.status(500).json({ message: "Failed to verify", error });
  }
}
exports.subsVerify = async (req, res) => {
  const { userEnteredOtp, mobile_no } = req.body;

  try {
    if (subsotp !== userEnteredOtp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again.", success: false });
    }

    let otpExpiryTime = new Date();
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5);
    const currentTime = new Date();
    if (currentTime > otpExpiryTime) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one.", success: false });
    }

    return res.status(200).json({ message: "OTP verified successfully.", success: true });

  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error });
  }
};

exports.getAllMob = async (req, res) => {
  try {
    const approvedMobileNumbers = await Registration.findAll({
      attributes: ['mobile_no', 'region','email'], 
      where: { is_rejected: "Approved" },
    });

    const mobileNumbersWithRegions = approvedMobileNumbers.map((item) => ({
      mobile_no: item.mobile_no,
      region: item.region,
      email:item.email
    }));

    return res.status(200).json({
      message: "Approved mobile numbers with regions found",
      success: true,
      data: mobileNumbersWithRegions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get approved mobile numbers and regions",
      success: false,
      error: error.message,
    });
  }
};

