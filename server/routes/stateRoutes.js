const express = require("express");
const router = express.Router()
const controllers = require("../controllers/stateController")


router.get("/get-all-state", controllers.getAllState)

module.exports = router