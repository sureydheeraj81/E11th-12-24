const corsServices = require("../models/subscription_plan");

exports.addSubcriptionPlan = async (req, res) => {

  try {

    const planData = await corsServices.findOne({ where: { cors_plan: req.body.cors_plan }});
    
    if (planData) {
      return res.status(200).send({ message: "This plan is already exist", success: false });
    }

    let newData = new corsServices(req.body);
    await newData.save();

    res
      .status(201)
      .send({ message: "New Subscription has been added", success: true });
  } catch (error) {
    res.status(500).send({
      message: "Error in add subscription plan",
      success: false,
      error,
    });
  }
};

exports.getSubscriptionData = async (req, res) => {

  try {

    const getData = await corsServices.findAll({});

    if( getData.length === 0 ){
      return res.status(200).send({ message: "Subscription is not available", success: false });
    }
    res.status(200).send({
      message: "Subscription data fetched successfully",
      success: true,
      data: getData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in getting subscription data",
      success: false,
      error,
    });
  }
};

exports.updateSubscriptionData = async (req, res) => {
  try {
    const data = await corsServices.findOne({ where: { sno: req.params.sno } });

    if (!data) {
      return res
        .status(404)
        .send({ message: "Subscription data doesn't found", success: false });
    }

    const { cors_plan, cors_description, subscription_charges, GST_amt, status } =
      req.body;

    if (cors_plan !== undefined) data.cors_plan = cors_plan;
    if (cors_description !== undefined)
      data.cors_description = cors_description;
    if (subscription_charges !== undefined)
      data.subscription_charges = subscription_charges;
    if (GST_amt !== undefined) data.GST_amt = GST_amt;
    if(status !== undefined) data.status = status;

    await data.save();

    res.status(200).send({ message: "Subscription data updated successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in subscription data updation", success: false });
  }
};

exports.deleteSubscriptionData = async (req, res) => {
  try {
    const data = await corsServices.findOne({ where: { sno: req.body.sno } });

    if (!data) {
      return res
        .status(404)
        .send({ message: "Subscription data not found", success: false });
    }

    await data.destroy();

    res.status(200).send({ message: "Subscription data deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in subscription data deletion", success: false });
  }
};
 