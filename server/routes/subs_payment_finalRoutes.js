const express = require("express");
const router = express.Router()
const controllers = require("../controllers/subs_payment_finalControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/submit-payment-final-data", controllers.submitSubsPaymentFinal);
router.get("/subs-payment-final-list", controllers.getSubsPaymentFinal);
// router.get("/subs-payment-final-user-list", controllers.getSubsPaymentFinalDetails)
router.post("/count-subs-payment-final-list", controllers.getCountSubsPaymentFinalDetails)
router.put("/update-subs-payment-final", authMiddleware, controllers.updateSubsPaymentFinal)

module.exports = router;