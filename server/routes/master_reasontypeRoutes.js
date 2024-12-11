const express = require("express");
const router = express.Router();
const masterReasonTypeControllers = require("../controllers/master_reasontypeControllers");

router.post("/add-rejection-reason", masterReasonTypeControllers.addRejectionReason);
router.get("/get-rejection-reason", masterReasonTypeControllers.getRejectionReason);
router.put("/update-rejection-reason/:sno", masterReasonTypeControllers.updateRejectionReason);
router.delete("/delete-rejection-reason", masterReasonTypeControllers.deleteRejectionReason)

module.exports = router