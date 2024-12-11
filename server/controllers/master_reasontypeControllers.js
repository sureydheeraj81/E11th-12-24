const Master_ReasonType = require("../models/master_reasontype");

exports.addRejectionReason = async (req, res) => {
  try {
    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let rejectionData = new Master_ReasonType(req.body);
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

exports.getRejectionReason = async (req, res) => {
  try {
    let rejectedData = await Master_ReasonType.findAll({});

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

exports.updateRejectionReason = async (req, res) => {
  try {
    let Browser = req.headers["user-agent"];
    let ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let updateRejectionData = await Master_ReasonType.findOne({
      where: { sno: req.params.sno }
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

exports.deleteRejectionReason = async (req, res) => {
  try {
    let rejectionData = await Master_ReasonType.findOne({
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
 