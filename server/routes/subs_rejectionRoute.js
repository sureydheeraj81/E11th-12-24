const express = require("express");
const router = express.Router();
const controllers = require("../controllers/subs_rejectionControllers");

router.post("/add-regs-rejection-reason", controllers.addSubsRejectionReason);
router.get("/get-regs-rejection-reason", controllers.getSubsRejectionReason);
router.put("/update-regs-rejection-reason/:sno", controllers.updateSubsRejectionReason);
router.delete("/delete-regs-rejection-reason", controllers.deleteSubsRejectionReason);

module.exports = router;