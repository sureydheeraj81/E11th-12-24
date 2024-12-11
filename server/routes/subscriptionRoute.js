const express = require("express");
const router = express.Router();
const subscriptionControllers = require("../controllers/subscriptionControllers");

router.post("/add-subcription-plan", subscriptionControllers.addSubcriptionPlan);
router.get("/get-subscription-data", subscriptionControllers.getSubscriptionData);
router.put("/update-subscription-data/:sno", subscriptionControllers.updateSubscriptionData);
router.delete("/delete-subscription-data", subscriptionControllers.deleteSubscriptionData);

module.exports = router;