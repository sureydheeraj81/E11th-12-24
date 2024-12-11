const admin = require("../models/admin");
const admin_log = require("../models/admin_log");
const path = require("path");
const url = require("url");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.register = async (req, res) => {
  try {
    const isAdmin = await admin.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (isAdmin) {
      return res
        .status(400)
        .send({ message: "Admin profile already exist", success: false });
    }

    const newAdmin = new admin(req.body);
    if (req.file) {
      newAdmin.profilePic = req.file.path;
    }

    let salt = await bcrypt.genSalt(10);
    let password = await newAdmin.password;
    let hashedPassword = await bcrypt.hash(password, salt);
    newAdmin.password = hashedPassword;
    await newAdmin.save();

    res.status(201).send({ message: "Registration successful", success: true });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin || isAdmin.status === "Deleted") {
      return res
        .status(404)
        .send({ message: "User doesn't exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, isAdmin.password);

    if (
      !isMatch &&
      isAdmin.status !== "Blocked" &&
      isAdmin.failed_attempt <= 5
    ) {
      isAdmin.failed_attempt = isAdmin.failed_attempt + 1;

      if (isAdmin.failed_attempt >= 5) {
        isAdmin.status = "Blocked";
        await isAdmin.save();
      }
      await isAdmin.save();
      return res.status(401).send({
        message: "Please Enter valid username and password!",
        success: false,
      });
    } else if (isAdmin.failed_attempt >= 5 || isAdmin.status === "Blocked") {
      return res.status(403).send({
        message:
          "Your account has been blocked due to unauthorized login attempts!",
        success: false,
      });
    } else if (isAdmin.status === "Pending") {
      return res
        .status(401)
        .send({ message: "Please contact to the super admin", success: false });
    }

    const token = jwt.sign({ id: isAdmin.username }, process.env.SECRET_KEY, {
      expiresIn: "6h",
    });

    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    isAdmin.failed_attempt = 0;
    isAdmin.login_attempt = isAdmin.login_attempt + 1;
    const currentDate = new Date();
    isAdmin.last_login = currentDate.toISOString();

    await isAdmin.save();

    let adminlogData = new admin_log(req.body);
    adminlogData.ipaddress = ipaddress;
    adminlogData.browseragent = Browser;
    adminlogData.accessthrough = fullUrl;
    // adminlogData.session_id = get otken data from cookies

    await adminlogData.save();

    res
      .status(200)
      .send({ message: "Login successful", success: true, data: token });
  } catch (error) {
    console.error("Error creating admin:", error);

    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.adminInfo = async (req, res) => {
  try {
    const adminData = await admin.findOne({
      where: { username: req.body.username },
    });

    adminData.password = undefined;

    if (!adminData) {
      return res
        .status(404)
        .send({ message: "Admin profile doesn't found", success: false });
    }

    res.status(200).send({
      message: "Your profile successfully fetched",
      success: true,
      data: adminData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in getting admin info data",
      success: false,
      error,
    });
  }
};

exports.getAllAdminInfo = async (req, res) => {
  try {
    const alldata = await admin.findAll();

    res.status(200).send({
      message: "All admin data fetched successfully",
      success: true,
      data: alldata,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in getting all admin data",
      success: false,
      error,
    });
  }
};

exports.updateProfile = async (req, res) => {
  const { full_name, email, username, mobile, gender, status, designation } =
    req.body;
  let profilePic = req.file ? req.file.filename : null;

  try {
    let isAdmin = await admin.findOne({
      where: { email: email },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "User doesn't exist", success: false });
    }

    if (profilePic && isAdmin.profilePic) {
      const oldProfilePicPath = path.join(
        __dirname,
        "../public/uploads",
        isAdmin.profilePic
      );
      if (fs.existsSync(oldProfilePicPath)) {
        fs.unlinkSync(oldProfilePicPath);
      }
    }
    isAdmin.full_name = full_name || isAdmin.full_name;
    isAdmin.email = email || isAdmin.email;
    isAdmin.username = username || isAdmin.username;
    isAdmin.mobile = mobile || isAdmin.mobile;
    isAdmin.gender = gender || isAdmin.gender;
    isAdmin.status = status || isAdmin.status;
    isAdmin.designation = designation || isAdmin.designation;

    if (profilePic) {
      isAdmin.profilePic = profilePic;
    }

    await isAdmin.save();

    res
      .status(200)
      .send({
        message: "Your profile has been updated successfully !",
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in profile updation", success: false, error });
  }
};

exports.logout = async (req, res) => {
  try {
    const isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "Admin doesn't exist", success: true });
    }

    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    let adminlogData = new admin_log(req.body);
    adminlogData.ipaddress = ipaddress;
    adminlogData.browseragent = Browser;
    adminlogData.accessthrough = fullUrl;
    adminlogData.action = "Logout";

    await adminlogData.save();

    res.status(200).send({ message: "Logout successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Error in logout", success: false });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "Admin doesn't exist", success: false });
    }

    let { status, usertype, modified_by, designation } = req.body;

    if (status !== undefined) {
      isAdmin.status = status;
    }
    if (usertype !== undefined) {
      isAdmin.usertype = usertype;
    }
    if (modified_by !== undefined) {
      isAdmin.modified_by = modified_by;
    }
    if (designation !== undefined) {
      isAdmin.designation = designation;
    }

    const currentDate = new Date(Date.now());
    isAdmin.date_modified = currentDate;

    await isAdmin.save();

    res
      .status(200)
      .send({ message: "Admin status updated successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in status updation", success: false, error });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const Admin = await admin.findOne({
      where: { email: req.body.email },
    });
    if (!Admin) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString("hex");
    const createdAt = Date.now();

    // Construct the reset link
    const resetLink = `http://localhost:5173/admin/change-password?token=${token}&createdAt=${createdAt}`;
    Admin.token = token;

    // Send the reset link via email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "cors.surveyofindia@gmail.com",
      to: Admin.email,
      subject: "Password Reset",
      text: `Click on the link to reset your password: ${resetLink}. This link expires in 10 minutes. \n\nWith Regards 
      \nCORS Processing and Monitoring Centre
      \nGeodetic And Research Branch
      \nSURVEY OF INDIA`,
    };

    await transporter.sendMail(mailOptions);

    await Admin.save();

    res.status(200).send({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error generating reset link", success: false });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password, createdAt } = req.body;

  try {
    const timeDifference = Date.now() - Number(createdAt);
    if (timeDifference > 10 * 60 * 1000) {
      return res
        .status(400)
        .send({ message: "Password reset link has expired !", success: false });
    }

    const Admin = await admin.findOne({ where: { token: token } });

    if (!Admin) {
      return res
        .status(400)
        .send({ message: "Invalid or expired token", success: false });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    Admin.password = hashedPassword;
    Admin.token = null;

    await Admin.save();

    res
      .status(200)
      .send({ message: "Password has been successfully reset", success: true });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error resetting password", success: false });
  }
};

exports.deleteAdminRequest = async (req, res) => {
  try {
    let isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "Admin doesn't exist", success: false });
    }

    isAdmin.destroy();

    res
      .status(200)
      .send({ message: "Admin request deleted successfully !", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in request deletion", success: false, error });
  }
};
