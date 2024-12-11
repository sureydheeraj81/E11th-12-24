const express = require("express");
const router = express.Router();
const feedbackControllers = require("../controllers/feedbackControllers")

router.post("/send", feedbackControllers.sendFeedback);
router.get("/get-feedback", feedbackControllers.getFeedback);
router.put("/update-feedback", feedbackControllers.updateFeedback);
router.delete("/delete-feedback", feedbackControllers.deleteFeedback);

module.exports = router;