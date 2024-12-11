const express = require("express");
const router = express.Router();
const master_categoryControllers = require("../controllers/master_categoryControllers")

router.post("/add-master-category", master_categoryControllers.addMasterCategory);

router.get("/get-master-category", master_categoryControllers.getMasterCategory);

router.put("/update-master-category/:sno", master_categoryControllers.updateMasterCategory);

router.delete("/delete-master-category", master_categoryControllers.deleteMasterCategory)


module.exports = router;