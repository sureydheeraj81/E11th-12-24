const Registration = require('../models/registrationFormModel');
const multer = require('multer');
const SMSClass = require("./SMSClass");
const path = require('path');
const nodemailer = require("nodemailer");
const sms = new SMSClass();

const Password = "cors@2024";
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
});

const storage = multer.diskStorage({
    destination: './public/users/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpg, jpeg, png, and pdf are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 750 * 1024 }
}).fields([
    { name: 'idtype_doc' },
    { name: 'upload_annexure' },
    { name: 'usertype_doc' }
]);

exports.createRegistration = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message, success: false });
        }


        const { region, mobile_no, name, company_name, email, address, district, state, pincode, usertype, photo_id_type, idtype_doc, upload_annexure, usertype_doc, category, emptype, category_other } = req.body;

        const username = email.split('@')[0];

        const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const generateApplicationNo = () => {
            const day = new Date();

            return `SOI${day.getFullYear()}${String(day.getMonth() + 1).padStart(2, '0')}${String(day.getDate()).padStart(2, '0')}${String(1).padStart(3, '0')}`;
        };

        try {
            const lastAppNum = await Registration.findAll({
                order: [['application_no', 'DESC']],
                limit: 1,
            });

            let application_no;
            if (lastAppNum.length > 0) {
                const appInc = parseInt(lastAppNum[0].application_no.replace('SOI', ''), 10) + 1;
                application_no = 'SOI' + appInc.toString().padStart(3, '0');
            } else {
                application_no = generateApplicationNo();
            }


            const baseData = {
                region,
                mobile_no,
                name,
                application_no,
                company_name,
                usertype,
                email,
                address,
                district,
                state,
                pincode,
                category_other,

                username,
                password: Password,
                date_created: dateCreatedInKolkata,
                photo_id_type,
                category,
                idtype_doc: req.files.idtype_doc ? req.files.idtype_doc[0].filename : null,
                upload_annexure: req.files.upload_annexure ? req.files.upload_annexure[0].filename : null
            };

            let newRegistration;
            if (["Govt User", "Research/Academic User"].includes(usertype)) {
                newRegistration = await Registration.create({
                    ...baseData, usertype_doc: req.files.usertype_doc ? req.files.usertype_doc[0].filename : null, emptype
                });
            } else if (usertype === "Private User") {
                newRegistration = await Registration.create(baseData);
            }

            const mailOptions = {
                from: 'cors.surveyofindia@gmail.com',
                to: email,
                subject: 'CORS Registration',
                text: `Dear ${name},\n\nYour application for CORS Services is submitted successfully. Your application no is: ${baseData.application_no}.Keep this number for future correspondance regarding your application. On Successful verification of documents your account will be activated within 24 working hrs.\n\nTeam CORS\nGeodetic and Reasearch Branch\nSURVEY OF INDIA\nThis is system generated email, please do not reply to this email.`,
            };


            const sms_texts = `Dear ${name} Thank you for signing up for SOI CORS Services. Your acknowledgment number is ${baseData.application_no}. Your account will be activated within 24 working hours, after successful verification of documents. Team CORS GRB`
            await sms.send_sms(
                baseData.mobile_no, sms_texts, process.env.PEID, process.env.NEW_REG_TEMPLATEID
            );

            await transporter.sendMail(mailOptions);
            res.status(201).json({ message: "Registration successful!", success: true, data: newRegistration });
        } catch (error) {
            res.status(500).json({ message: 'Error creating registration!', success: false, error });
        }
    });
};

exports.updateRegistration = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message, success: false });
        }

        const sno = req.params.sno;
        const { adminName, is_rejected, mobile_no, region, email, rejected_reason, emptype, username, rejectDes } = req.body;

        if (!sno) {
            return res.status(400).json({ message: "Registration ID is required for update!", success: false });
        }

        try {
            const registration = await Registration.findOne({ where: { sno } });
            if (!registration) {
                return res.status(404).json({ message: "Registration not found!", success: false });
            }

            const registrationRep = await Registration.findOne({
                where: {
                    is_rejected: "Approved",
                    region: { [Op.in]: ['region-1', 'region-2'] },
                    mobile_no,
                },
            });

            if (registrationRep && registrationRep.region === region) {
                return res.status(404).json({
                    message: `This mobile number is already approved in ${region}!`,
                    success: false,
                });
            }

            const dateUpdatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
            const updateData = {
                ...req.body,
                username: username || email.split('@')[0],
                date_updated: dateUpdatedInKolkata,

                // ...(is_rejected === "Approved" || "Pending" && { activated_by: adminName, date_modified: dateUpdatedInKolkata }),
                ...(is_rejected === "Approved" && { activated_by: adminName, date_modified: dateUpdatedInKolkata }),

                ...(is_rejected === "Rejected" && { rejected_date: dateUpdatedInKolkata, rejected_reason, modified_by: adminName })
            };

            if (["Govt User", "Research/Academic User"].includes(req.body.usertype)) {
                updateData.emptype = emptype;
            }

            await Registration.update(updateData, { where: { sno } });
            const url = 'https://cors.surveyofindia.gov.in', download_section_url = 'sdkfog', survey_website_url = 'dfgdg', webmail_url = 'ddd'

            const subject = is_rejected === "Approved" ? 'Congratulations!' : 'Rejection!';
            const text = is_rejected === "Approved"
                ? `<html>
                <body>
                <p>Dear Mr/Mrs <b>${updateData.username},</b></p>
                <p>Thank you for registering with the Survey of India CORS Network.</p>
                <p>Your account has been successfully activated. You can login with <b>Username</b>: ${updateData.username} and <b>Password</b>: ${Password}</p>
                <p>For security reasons, you are requested to change your password.</p>
                <p>Subscriptions are available free of charge to:</p>
                <ul>
                <li>Central Govt. users</li>
                <li>State Govt. users</li>
                <li>Govt. academic institutions</li>
                <li>Consultants directly on roll with State/Central Govt. Dept./Ministries.</li>
                </ul>
                <p>For the rest of the categories, the subscriptions will be made available within one business day after receiving the subscription charges.</p>
                <p>Please visit the <a href="${download_section_url}" target="_blank">Guidelines & Operating Procedure</a> section of our website <a href="${url}" target="_blank">cors.surveyofindia.gov.in</a> for MOP (Model Operating Procedures).</p>
                <p>If you have any issues, please visit our website <a href="${survey_website_url}" target="_blank">cors.surveyofindia.gov.in</a> or kindly reach us at <a href="${webmail_url}">cors-grb.soi@gov.in</a>.</p>
                <br>
                <p>With Regards,</p>
                <p>CORS Processing and Monitoring Centre<br>
                Geodetic And Research Branch<br>
                SURVEY OF INDIA</p>
                <p>This is a system-generated email. Please do not reply to this email.</p>
                </body>
                </html>`

                : `Dear ${updateData.username},\n\nYour registration has been rejected due to: ${rejectDes}. Below are your updated credentials:\n\nUsername: ${updateData.username}\nPassword: ${Password}\n\nThank you!`;


            const mailOptions = {
                from: 'cors.surveyofindia@gmail.com', to: registration.email, subject, html: text,
            };


            const sms_texts_reject = `Dear ${updateData.name} Your application has been rejected due to ${rejectDes}. Kindly register again with valid documents on the CORS Web Portal. Team CORS GRB`
            const sms_texts_accept = `Dear ${updateData.name} You have been successfully registered on CORS Web Portal. Your User Name: ${updateData.username} and Password: ${Password}. It is mandatory to change your password at first login for security reasons. Team CORS GRB`
            if (is_rejected === "Approved") {
                await sms.send_sms(updateData.mobile_no, sms_texts_accept, process.env.PEID, process.env.NEW_REG_ACCEPTED_TEMPLATEID)
            } else if (is_rejected === "Rejected") {
                await sms.send_sms(updateData.mobile_no, sms_texts_reject, process.env.PEID, process.env.NEW_REG_REJECTED_TEMPLATEID)
            }


            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Registration updated successfully!", success: true });
        } catch (error) {
            res.status(500).json({ message: 'Error updating registration!', success: false, error });
        }
    });
};

const { Op, Sequelize } = require("sequelize");

exports.approvedDataTrans = async (req, res) => {
    try {
        const [exclusiveNumbers, duplicateEmails] = await Promise.all([
            Registration.findAll({
                attributes: ["mobile_no"],
                where: { is_rejected: "Approved" },
                group: ["mobile_no"],
                having: Sequelize.literal("COUNT(DISTINCT region) = 1"),
                raw: true,
            }).then((data) => data.map((item) => item.mobile_no)),
            Registration.findAll({
                attributes: ["email"],
                where: { is_rejected: "Approved" },
                group: ["email"],
                having: Sequelize.literal("COUNT(DISTINCT region) > 1"),
                raw: true,
            }).then((data) => data.map((item) => item.email)),
        ]);

        const validData = await Registration.findAll({
            where: {
                is_rejected: "Approved",
                mobile_no: { [Op.in]: exclusiveNumbers },
                email: { [Op.notIn]: duplicateEmails },
            },
        });

        return res.status(200).json({
            message: "Approved Data Retrieved Successfully!",
            AcceptedData: validData,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving Approved Data!",
            success: false,
            error: error.message,
        });
    }
};

exports.regionTransfer = async (req, res) => {
   

        const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

        try {
            const {
                region,
                is_rejected,
                mobile_no,
                name,
                company_name,
                username,
                email,
                password,
                application_no,
                address,
                district,
                category_other,
                state,
                date_created,
                adminName,
                pincode,
                usertype,
                photo_id_type,
                category,
                upload_annexure,
                idtype_doc,
                usertype_doc,
                emptype
            } = req.body;

            const newRegion = region === 'region-2' ? 'region-1' : 'region-2';

            const baseData = {
                region: newRegion,
                mobile_no,
                name,
                application_no,
                company_name,
                usertype,
                email,
                address,
                district,
                state,
                modified_by: adminName,
                pincode,
                is_rejected,
                category_other,
                username,
                password,
                date_created,
                date_modified: dateCreatedInKolkata,
                photo_id_type,
                category,
                upload_annexure,
                idtype_doc,
                usertype_doc,
                emptype
            };

            const existingRegistration = await Registration.findOne({ where: { is_rejected: "Approved", mobile_no } });

            if (existingRegistration) {
                if (existingRegistration.region === newRegion) {
                    return res.status(400).json({ message: `This Number ${mobile_no} already exists in ${newRegion}!`, success: false });
                }

                if (existingRegistration.region !== newRegion) {
                    await Registration.create(baseData);
                    return res.status(201).json({ message: `You have been transferred to ${newRegion}!`, success: true });
                }
            } else {
                return res.status(404).json({ message: `No registration found for ${mobile_no}.`, success: false });
            }

        } catch (error) {
            return res.status(500).json({ message: `Internal server error!`, success: false });
        }
    
};

// const { Op, Sequelize } = require("sequelize");
// exports.approvedDataTrans = async (req, res) => {
//     try {

//         const exclusiveNumbers = await Registration.findAll({
//             attributes: ["mobile_no"],
//             where: { is_rejected: "Approved" },
//             group: ["mobile_no"],
//             having: Sequelize.literal("COUNT(DISTINCT region) = 1"),
//             raw: true,
//         }).then((data) => data.map((item) => item.mobile_no));
//         const duplicateEmails = await Registration.findAll({
//             attributes: ["email"],
//             where: { is_rejected: "Approved" },
//             group: ["email"],
//             having: Sequelize.literal("COUNT(DISTINCT region) > 1"),
//             raw: true,
//         }).then((data) => data.map((item) => item.email));

//         const validData = await Registration.findAll({
//             where: {
//                 is_rejected: "Approved",
//                 mobile_no: { [Op.in]: exclusiveNumbers },
//                 email: { [Op.notIn]: duplicateEmails },
//             },
//         });

//         return res.status(200).json({
//             message: "Approved Data Retrieved Successfully!",
//             AcceptedData: validData,
//             success: true,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error retrieving Approved Data!",
//             success: false,
//             error: error.message,
//         });
//     }
// };


// exports.regionTransfer = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: err.message, success: false });
//         }

//         const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

//         try {
//             const {
//                 region,
//                 is_rejected,
//                 mobile_no,
//                 name,
//                 company_name,
//                 username,
//                 email,
//                 password,
//                 application_no,
//                 address,
//                 district,
//                 category_other,
//                 state,
//                 date_created,
//                 adminName,
//                 pincode,
//                 usertype,
//                 photo_id_type,
//                 category,
//                 emptype
//             } = req.body;

//             const newRegion = region === 'region-2' ? 'region-1' : 'region-2';

//             const baseData = {
//                 region: newRegion,
//                 mobile_no,
//                 name,
//                 application_no,
//                 company_name,
//                 usertype,
//                 email,
//                 address,
//                 district,
//                 state,
//                 modified_by: adminName,
//                 pincode,
//                 is_rejected,
//                 category_other,
//                 username,
//                 password,
//                 date_created,
//                 date_modified: dateCreatedInKolkata,
//                 photo_id_type,
//                 category,
//                 upload_annexure: req.files && req.files.upload_annexure ? req.files.upload_annexure[0].filename : null,
//                 idtype_doc: req.files && req.files.idtype_doc ? req.files.idtype_doc[0].filename : null,
//                 usertype_doc: req.files && req.files.usertype_doc ? req.files.usertype_doc[0].filename : null,
//                 emptype
//             };

//             const existingRegistration = await Registration.findOne({ where: { is_rejected: "Approved", mobile_no } });

//             if (existingRegistration) {
//                 if (existingRegistration.region === newRegion) {
//                     return res.status(400).json({ message: `This Number ${mobile_no} already exists in ${newRegion}!`, success: false });
//                 }

//                 if (existingRegistration.region !== newRegion) {
//                     await Registration.create(baseData);
//                     return res.status(201).json({ message: `You have been transferred to ${newRegion}!`, success: true });
//                 }
//             } else {
//                 return res.status(404).json({ message: `No registration found for ${mobile_no}.`, success: false });
//             }

//         } catch (error) {
//             return res.status(500).json({ message: `Internal server error!`, success: false });
//         }
//     });
// };

exports.getSingleData = async (req, res) => {
    try {
        const user = await Registration.findByPk(req.params.sno)
        if (user) {
            res.status(200).json({ success: true, message: "User Data Found!!!", Data: user })
        }
        else {
            res.status(404).json({ message: "User is not Found !!!" })
        }

    }
    catch (error) {
        return res.status(500).json({ message: "Unable to get user !!!" })
    }
}



// rejected data
exports.rejectedData = async (req, res) => {
    try {
        const rejectedInfo = await Registration.findAll({
            where: { is_rejected: "Rejected" }, attributes: [
                "sno",
                "application_no",
                "date_created",
                "name",
                "mobile_no",
                "email",
                "usertype",
                "company_name",
                "region",
                "is_rejected",

                "modified_by",
                "date_modified",
                "rejected_reason",
                "rejected_date",
            ],
        })
        const totaldata = rejectedInfo.length

        res.status(200).json({ message: "Rejecteddata Retrieved Successfully!", totaldata: totaldata, RejectedData: rejectedInfo, success: true })
    }
    catch (error) {

        res.status(500).json({ message: 'Error retrieving rejectedData !!!', success: false, error });
    }
}

// Approved data Or Total Accepted Users data!!!
exports.approvedData = async (req, res) => {
    try {
        const acceptInfo = await Registration.findAll({
            where: { is_rejected: "Approved" }, attributes: [
                "sno",
                "application_no",
                "date_created",
                "name",
                "mobile_no",
                "email",
                "usertype",
                "company_name",
                "region",
                "is_rejected",

                "modified_by",
                "date_modified",

            ],
        })
        const totaldata = acceptInfo.length
        res.status(200).json({ message: "ApproveddData Retrieved Successfully!", totaldata: totaldata, AcceptedData: acceptInfo, success: true })
    }
    catch (error) {

        res.status(500).json({ message: 'Error retrieving ApprovedData !!!', success: false, error });
    }
}



// Region-1 Data
exports.regionOneData = async (req, res) => {
    try {
        const regionOneData = await Registration.findAll({
            where: { region: "region-1", is_rejected: "Approved" }, attributes: [
                "sno",
                "application_no",
                "date_created",
                "name",
                "mobile_no",
                "email",
                "usertype",
                "company_name",
                "region",
                "is_rejected",

                "modified_by",
                "date_modified",

            ],
        })
        const totaldata = regionOneData.length
        res.status(200).json({ message: "Region-1 Data Retrieved Successfully!", totalData: totaldata, RegionOneData: regionOneData, success: true })
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving regionOneData !!!', success: false, error });

    }
}

const dataAdmin = require("../models/admin")
const subsRegistration = require("../models/subscription_payment_final")
const usageUserType = require("../models/usage_user_type")
const fetchUserDataByRegionAndType = async (region, userType) => {
    return await Registration.findAll({ where: { region, is_rejected: "Approved", usertype: userType } })
};

exports.regionOneGPA = async (req, res) => {
    const fetchAcceptedData = async (region) => { return await Registration.findAll({ where: { region, is_rejected: "Approved" } }) }
    const fetchRejectedData = async () => { return await Registration.findAll({ where: { is_rejected: "Rejected" } }) }
    const fetchPendingData = async () => { return await Registration.findAll({ where: { is_rejected: "Pending" } }) }
    try {
        const regionOneGovData = await fetchUserDataByRegionAndType("region-1", "Govt User");
        const regionOneAcadData = await fetchUserDataByRegionAndType("region-1", "Research/Academic User");
        const regionOnePrivData = await fetchUserDataByRegionAndType("region-1", "Private User");

        const regionTwoGovData = await fetchUserDataByRegionAndType("region-2", "Govt User");
        const regionTwoAcadData = await fetchUserDataByRegionAndType("region-2", "Research/Academic User");
        const regionTwoPrivData = await fetchUserDataByRegionAndType("region-2", "Private User");
        const regionOne = await fetchAcceptedData("region-1");
        const regionTwo = await fetchAcceptedData("region-2");
        const rejectedData = await fetchRejectedData();
        const pendingData = await fetchPendingData();
        const industryTypes = [
            "Agriculture",
            "Aviation",
            "Climatology And Earth Sciences",
            "Communication And Navigation",
            "Defence And Paramilitary",
            "Disaster Management",
            "Drone Based Services",
            "Engineering And Construction",
            "Fisheries And Maritime Activities",
            "Forest And Environment",
            "Geological And Geotechnical",
            "Geospatial Development",
            "Information Unavailable",
            "Land Survey And Mapping",
            "Logistics",
            "Mining Industries",
            "others",
            "Petroleum And Natural Gas Industries",
            "Remote Sensing Applications",
            "Research & Development",
            "Telecommunication",
            "Transportation",
            "Urban And Rural Development",
        ];
        const industryTypeCategory = await Registration.findAll();
        const regData = industryTypeCategory.map((item) => item.dataValues);
        const industryTypeDetails = industryTypes.map((type) => ({
            IndustryTypes: type,
            region1: regData.filter((indData) => indData.is_rejected === "Approved" && indData.region === "region-1" && indData.category.toLowerCase() === type.toLowerCase()).length || 0,
            region2: regData.filter((indData) => indData.is_rejected === "Approved" && indData.region === "region-2" && indData.category.toLowerCase() === type.toLowerCase()).length || 0,
        }));

        const response = await usageUserType.findAll();

        const userTypeMap = {
            "Other Government Users": "otherGovUser",
            "Private Users": "privateUser",
            "Research and Academic Users": "researchAcademicUser",
            "Survey of India": "SOIUser",
            "Training and Maintenance": "tranMaintanance",
        };

        const data = Object.keys(userTypeMap).map((userType) => {
            const filteredData = response.filter((data) => data.user_type === userType);
            return {
                user_type: userType,
                rtk_region_1: Math.floor(filteredData.reduce((sum, acc) => sum + acc.rtk_region_1, 0)),
                rtk_region_2: Math.floor(filteredData.reduce((sum, acc) => sum + acc.rtk_region_2, 0)),
                rds_region_1: Math.floor(filteredData.reduce((sum, acc) => sum + acc.rds_region_1, 0)),
                rds_region_2: Math.floor(filteredData.reduce((sum, acc) => sum + acc.rds_region_2, 0)),
            };
        });
        const allData = {
            regionOne: regionOne.length, regionTwo: regionTwo.length, rejectedData: rejectedData.length, pendingData: pendingData.length, total: regionOne.length + regionTwo.length + rejectedData.length + pendingData.length, allVarified: regionOne.length + regionTwo.length
        }

        const responseData = {
            region1: { govtUserData: regionOneGovData.length, acadUserData: regionOneAcadData.length, privUserData: regionOnePrivData.length, total1: regionOneGovData.length + regionOneAcadData.length + regionOnePrivData.length },
            region2: {
                govtUserData: regionTwoGovData.length, acadUserData: regionTwoAcadData.length, privUserData: regionTwoPrivData.length, total2: regionTwoGovData.length + regionTwoAcadData.length + regionTwoPrivData.length
            }
        };

        const fetchSubsUserDataByRegionAndType = async (region_name) => { return await subsRegistration.findAll({ where: { region_name, status: "Approved" } }) };
        const regionOneSubs = await fetchSubsUserDataByRegionAndType("region-1");
        const regionTwoSubs = await fetchSubsUserDataByRegionAndType("region-2");
        const pendingSubs = await subsRegistration.findAll({ where: { status: "Pending" } });
        const rejectedSubs = await subsRegistration.findAll({ where: { status: "Rejected" } });
        const regionData = { region1: regionOneSubs.length, region2: regionTwoSubs.length, };
        const statusData = { pending: pendingSubs.length, rejected: rejectedSubs.length, };
        const totalAccepted = regionData.region1 + regionData.region2;
        const totalSubscribers = totalAccepted + statusData.pending + statusData.rejected;
        const responseSubsData = { ...regionData, ...statusData, totalAccepted, totalSubscribers };

        const admins = await dataAdmin.findAll({where: { status: ["Active", "Pending", "Blocked"] },});

        const adminAll = admins.reduce((counts, admin) => {
                counts[admin.status.toLowerCase()] += 1;
                counts.totalAdmin += 1;
                return counts;
            },
            { active: 0, pending: 0, blocked: 0, totalAdmin: 0 }
        );


        res.status(200).json({
            message: "Region User Data Retrieved Successfully!!!",adminAll:adminAll, subsAll: responseSubsData, GPAdata: responseData, allData: allData, industryTypeDetails: industryTypeDetails, data: data, success: true
        });

    } catch (error) {
        res.status(500).json({message: 'Error retrieving region data!!!',success: false,error});
    }
};

// Region-2 Data
exports.region2Data = async (req, res) => {
    try {
        const regionTwoData = await Registration.findAll({
            where: { region: "region-2", is_rejected: "Approved" }, attributes: [
                "sno",
                "application_no",
                "date_created",
                "name",
                "mobile_no",
                "email",
                "usertype",
                "company_name",
                "region",
                "is_rejected",

                "modified_by",
                "date_modified",

            ],
        })
        const totaldata = regionTwoData.length
        res.status(200).json({ message: "Region-2 Data Retrieved Successfully!", TotalData: totaldata, Region2Data: regionTwoData, success: true })
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving regionTwoData !!!', success: false, error });

    }
}

//Pending Users List
exports.pendingList = async (req, res) => {
    try {
        const pendingList = await Registration.findAll({
            where: { is_rejected: "Pending" },
            attributes: [
                "sno",
                "application_no",
                "date_created",
                "name",
                "mobile_no",
                "email",
                "usertype",
                "company_name",
                "region",
                "is_rejected",

                "modified_by",
                "date_modified",
                "rejected_reason",
            ],
        })
        const totaldata = pendingList.length
        res.status(200).json({ message: "pending List Retrived Successfully!", success: true, totaldata: totaldata, pendingData: pendingList })
    }
    catch (error) {
        res.status(500).json({ message: "unable to retrive Pending user data!!!", success: false, error })
    }
}
//get all users
exports.viewAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.findAll({
            attributes: [
                "sno",
                "application_no",
                "date_created",
                "name",
                "mobile_no",
                "email",
                "usertype",
                "company_name",
                "region",
                "is_rejected",

                "modified_by",
                "date_modified",
                "rejected_reason",
                "rejected_date"
            ],
        });
        const totaldata = registrations.length
        res.status(200).json({ message: "Registrations data retrieved successfully!!!", TotalData: totaldata, data: registrations, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving registrations !!!', success: false, error });
    }
};

const { QueryTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
exports.dataChart = async (req, res) => {
    try {
        const data = await sequelize.query(
            `SELECT 
         YEAR(date_created) AS year,
         MONTH(date_created) AS month, 
         COUNT(*) AS count 
       FROM cors_registration_form 
       WHERE is_rejected = 'Approved'  -- Filter by Approved is_rejected
        GROUP BY YEAR(date_created), MONTH(date_created) 
       ORDER BY YEAR(date_created), MONTH(date_created)`,
            { type: QueryTypes.SELECT }
        );

        const subsdata = await sequelize.query(
            `SELECT 
         YEAR(date_created) AS year,
         MONTH(date_created) AS month, 
         COUNT(*) AS count 
       FROM subscription_payment_final 
       WHERE status = 'Approved'  -- Filter by Approved status
       GROUP BY YEAR(date_created), MONTH(date_created) 
       ORDER BY YEAR(date_created), MONTH(date_created)`,
            { type: QueryTypes.SELECT }
        );

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
        const subsformattedData = subsdata.map((entry) => ({ year: entry.year, month: monthNames[entry.month - 1], count: entry.count, }));
        const formattedData = data.map((entry) => ({ year: entry.year, month: monthNames[entry.month - 1], count: entry.count, }));
        res.status(200).json({ corsRegistrations: formattedData, subscriptions: subsformattedData, });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', success: false });
    }
};










































