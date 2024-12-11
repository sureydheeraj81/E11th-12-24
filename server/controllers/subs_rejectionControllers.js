const Subs_Rejection = require("../models/subs_rejection")

exports.addSubsRejectionReason = async (req, res) => {

  try {
    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let rejectionData = new Subs_Rejection(req.body);
    rejectionData.browser = Browser;
    rejectionData.ipaddress = ipaddress;

    // rejectionData.updated_by = req.user.sno; // add admin id

    await rejectionData.save();

    res.status(201).send({
      message: "Rejection data has been saved successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in adding rejection reason",
      success: false,
      error,
    });
  }
};

exports.getSubsRejectionReason = async (req, res) => {
  try {
    let rejectedData = await Subs_Rejection.findAll({});

    if (rejectedData.length === 0) {
      return res.status(200).send({ message: "Data not found", success: true , data: rejectedData});
    }
    res.status(200).send({
      message: "Data found successfully",
      success: true,
      data: rejectedData,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in getting rejected data",
      success: false,
      error,
    });
  }
};

exports.updateSubsRejectionReason = async (req, res) => {
  try {
    let Browser = req.headers["user-agent"];
    let ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let updateRejectionData = await Subs_Rejection.findOne({
      where: { sno: req.params.sno },
    });

    if (!updateRejectionData) {
      return res
        .status(404)
        .send({ message: "Data doesn't exist", success: false });
    }

    updateRejectionData.description = req.body.description;
    updateRejectionData.updated_by = req.body.updated_by;
    updateRejectionData.Browser = Browser;
    updateRejectionData.ipaddress = ipaddress;

    await updateRejectionData.save();

    res
      .status(200)
      .send({ message: "Rejection data updated successfully", success: true });
  } catch (error) {
    return res.status(500).send({
      message: "Error in rejection reason updation",
      success: false,
      error,
    });
  }
};

exports.deleteSubsRejectionReason = async (req, res) => {
  try {
    let rejectionData = await Subs_Rejection.findOne({
      where: { sno: req.body.sno },
    });

    if (!rejectionData) {
      return res
        .status(404)
        .send({ message: "Data not found", success: false });
    }

    await rejectionData.destroy();

    res
      .status(200)
      .send({ message: "Data deleted successfully", success: true});
  } catch (error) {
    return res
      .status(500)
      .send({
        message: "Error in rejection data deletion",
        success: false,
        error: error,
      });
  }
};