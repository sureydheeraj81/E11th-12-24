const State = require("../models/state_name");

exports.getAllState = async (req, res) => {
  try {
    let state = await State.findAll();

    return res
      .status(200)
      .send({
        message: "State list fetched successfully",
        success: true,
        data: state,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting State data", success: false });
  }
};
