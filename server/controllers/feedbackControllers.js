const Feedback = require("../models/feedback");

exports.sendFeedback = async (req, res) => {
  try {
    let getData = new Feedback(req.body);

    await getData.save();

    res
      .status(201)
      .send({ message: "Feedback sent successfully ! ", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in feedback data", success: false, error });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    let getData = await Feedback.findAll({});

    if (getData.length === 0) {
      return res.status(200).send({ message: "Data not found", success: true });
    }

    res.status(200).send({
      message: "Feedback data fetched successfully",
      success: true,
      data: getData,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in getting feedback data",
      success: false,
      error,
    });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    let updateFeedbackStatus = await Feedback.findOne({
      where: { sno: req.body.sno },
    });

    if (!updateFeedbackStatus) {
      return res
        .status(404)
        .send({ message: "Data not found", success: false });
    }

    updateFeedbackStatus.status = req.body.status;

    await updateFeedbackStatus.save();

    res.status(200).send({
      message: "Feedback status updated successfully",
      success: true,
      data: updateFeedbackStatus,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in feedback updation", success: false, error });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    let deleteFeedbackData = await Feedback.findOne({
      where: { sno: req.body.sno },
    });

    if (!deleteFeedbackData) {
      return res
        .status(404)
        .send({ message: "Data not found", success: false });
    }

    deleteFeedbackData.destroy();

    res
      .status(200)
      .send({ message: "Feedback deleted successfully", success: true });
      
  } catch (error) {
    return res
      .status(500)
      .send({
        message: "Error in feedback data deletion",
        success: false,
        error,
      });
  }
};
