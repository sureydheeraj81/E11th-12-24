const { registerModel } = require("../models");
const subscriptionPaymentFinal=require("../models/subscription_payment_final")
const Sequelize = require("sequelize")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const SMSClass = require("./SMSClass");
const nodemailer = require('nodemailer');
const sms = new SMSClass();



const MAX_FILE_SIZE = 750 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './public/PaymentReceipt/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE }
});

const uploadPDF = upload.single('path_sub_pdf');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});



exports.submitSubsPaymentFinal = async (req, res) => {
  try {
    uploadPDF(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: "File size is too large. Maximum allowed size is 750 KB.", success: false });
        }
        return res.status(500).json({ message: "Error in file upload", success: false, error: err.message });
      }

      const {
        name, state_id, address, email, mobile, region_name, subs_receiptNo, subs_receiptAmt,
        GST_name, GST_number, user_reg_id, cors_plan, subscription_charge, GST_amt, gst_receiptAmt, sub_gst
      } = req.body;



      const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'short' });
      const year = String(date.getFullYear()).slice(-2);
      const datePrefix = `${region_name === "region-1" ? 'R1' : 'R2'}-${day}${month}${year}-`;

      const lastAppNum = await subscriptionPaymentFinal.findAll({
        order: [['date_created', 'DESC']],
        limit: 1,
      });

      let ack_no;
      if (lastAppNum.length > 0) {
        const lastAckNo = lastAppNum[0].ack_no;
        const lastNumber = parseInt(lastAckNo.split('-00').pop(), 10);
        ack_no = `${datePrefix}${(lastNumber + 1).toString().padStart(3, '0')}`;
      } else {
        ack_no = `${datePrefix}001`;
      }


      const formData = {
        ack_no,
        subs_receiptNo,
        subs_receiptAmt,
        gst_recieptAmt: GST_amt,
        sub_gst,
        name,
        email,
        region_name,
        user_reg_id,
        cors_plan,
        subscription_charge,
        mobile,
        address,
        state_id,
        date_created: dateCreatedInKolkata,
        GST_name: GST_name || null,
        GST_number: GST_number || null,
        gst_receiptAmt,
        path_sub_pdf: req.file ? req.file.path : null,
      };

      const createdFormData = await subscriptionPaymentFinal.create(formData);

      const mailOptions = {
        from: 'cors.surveyofindia@gmail.com',
        to: email,
        subject: 'CORS Subscription',
        text: `Dear ${formData.name},\n\nYour order for the purchase of CORS Products and Services has been placed successfully. Your order Acknowledgement Number is ${formData.ack_no}. Please keep this number for future correspondence. On successful verification of payment details, your subscription will be activated within 24 hours.\n\nTeam CORS\nGeodetic And Research Branch\nSURVEY OF INDIA\nThis is a system-generated email, please do not reply to this email.`
      };

      
     const sms_texts= `Dear ${formData.name} Thank you for purchasing subscriptions for CORS Services. Your order id is ${formData.ack_no}. Your services will be activated within 24 working hours, after successful verification of documents. Team CORS GRB`
      await sms.send_sms(
        formData.mobile,
        sms_texts,
        process.env.PEID,
        process.env.NEW_SUB_TEMPLATEID
      );

      await transporter.sendMail(mailOptions);

      res.status(201).json({
        message: 'Form data submitted successfully!',
        data: createdFormData,
        success: true,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error in details submission!", success: false, error: error.message });
  }
};





exports.getSubsPaymentFinal = async (req, res) => {
  try {
    
      subscriptions = await subscriptionPaymentFinal.findAll();

    if (subscriptions.length > 0) {
      res.status(200).send({
        message: "Subscription data fetched successfully",
        success: true,
        data: subscriptions,
      });
    } else {
      res
        .status(404)
        .send({ message: "No matching subscriptions found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", success: false, error });
  }
};

exports.getCountSubsPaymentFinalDetails = async (req, res) => {
  try {

    const { name, status, limit = 10 } = req.body;

    const limitNumber = Number(limit) || 10;

    // Define search criteria object dynamically
    const searchCriteria = {};

    // Handle search by name
    if (name && name.length > 0) {
      searchCriteria[Sequelize.Op.or] = [
        { name: { [Sequelize.Op.like]: `%${name}%` } },
        { email: { [Sequelize.Op.like]: `%${name}%` } },
        { mobile: { [Sequelize.Op.like]: `%${name}%` } },
        { ack_no: { [Sequelize.Op.like]: `%${name}%` } },
      ];
    }

    // Handle search by status (exact match)
    if (status) {
      searchCriteria.status = { [Sequelize.Op.eq]: status };
    }

    // Fetch data based on search criteria
    let subscriptions;
    subscriptions = await subscriptionPaymentFinal.findAll({
      where: searchCriteria,
      order: [["date_created", "DESC"]],
      limit: limitNumber,
    });

    if (subscriptions.length > 0) {
      res.status(200).send({
        message: "Subscription data fetched successfully",
        success: true,
        data: subscriptions,
      });
    } else {
      res.status(404).send({
        message: "No matching subscriptions found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};


exports.getSubsPaymentFinalDetails = async (req, res) => {
  try {
    const users = await registerModel.findAll({
      include: [
        {
          model: subscriptionPaymentFinal,
          as: "subscriptions", // Correct alias here
          // attributes: ['ack_no', 'subscription_charge', 'cors_plan'],
        },
      ],
      logging: console.log, // Logs the SQL query
    });

    res.status(200).send({
      message: "Data fetched successfully!",
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error in details fetching!",
      success: false,
      error: error.message,
    });
  }
};

exports.updateSubsPaymentFinal = async (req, res) => {
  try {
    let subsData = await subscriptionPaymentFinal.findOne({
      where: { ack_no: req.body.ack_no },
    });
    if (!subsData) {
      res
        .status(404)
        .send({ message: "This plan doesn't exist", success: true });
    }
    let currentStatus = req.body.status;
    let currentDate = () => {
      let date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    if (currentStatus === "Verified") {
      subsData.status = currentStatus;
      subsData.payment_verified_by = req.body.username;
      subsData.payment_verification_date = currentDate();
    } else if (currentStatus === "Approved") {
      subsData.status = currentStatus;
      subsData.approved_by = req.body.username;
      subsData.approved_date = currentDate();
      subsData.challan_no = req.body.challan_no;

      const mailOptions = {
        from: "cors.surveyofindia@gmail.com",
        to: subsData.email,
        subject: "CORS Subscription",
        text: `Dear ${subsData.name},\n\nThank you for purchasing CORS subscriptions. Your subscription having order id ${subsData.ack_no} has been successfully activated on ${subsData.approved_date} .\n\nIf you have any issues please visit our website cors.surveryofindia.gov.in or kindly reach us at cors-grb.soi@gov.in.
                \n\nWith Regards 
                \nCORS Processing and Monitoring Centre
                \nGeodetic And Research Branch
                \nSURVEY OF INDIA`,
      };

      await transporter.sendMail(mailOptions);

      let smsData = `Dear ${subsData.name} Your order having order id ${subsData.ack_no} has been activated successfully. Team CORS GRB`;
      await sms.send_sms(
        subsData.mobile,
        smsData,
        process.env.PEID,
        process.env.SUBS_ACC_TEMPLATE_ID
      );
    } else if (currentStatus === "Rejected") {
      subsData.status = currentStatus;
      subsData.rejected_by = req.body.username;
      subsData.rejection_reason = req.body.rejection_reason;
      subsData.rejected_date = currentDate();

      const mailOptions = {
        from: "cors.surveyofindia@gmail.com",
        to: subsData.email,
        subject: "CORS Subscription",
        text: `Dear ${subsData.name}
                \nYour order having order id ${subsData.ack_no} has been rejected due to ${req.body.rejection_reason_data} on ${subsData.rejected_date} .\nYou are requested to purchase again by following the SOP https://cors.surveyofindia.gov.in/policies/subscription_sop.pdf. 
                \nIf you have any issues please visit our website www.cors.surveryofindia.gov.in or kindly reach us at cors-grb.soi@gov.in.
                \n\nWith Regards
                \nCORS Processing and Monitoring Centre
                \nGeodetic And Research Branch
                \nSURVEY OF INDIA`,
      };

      await transporter.sendMail(mailOptions);

      let smsData = `Dear ${subsData.name}, Your order having order id ${subsData.ack_no} is rejected due to ${req.body.rejection_reason_data}. Kindly purchase the subscription again with valid documents on the CORS Web Portal. Team CORS GRB`;
      await sms.send_sms(
        subsData.mobile,
        smsData,
        process.env.PEID,
        process.env.SUBS_REJ_TEMPLATE_ID
      );
    }
    await subsData.save();
    res.status(200).send({
      message: "User subscription status updated successfully !",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in final payment details updation",
      success: false,
      error,
    });
  }
};