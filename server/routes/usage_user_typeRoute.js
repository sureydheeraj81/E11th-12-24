const express=require("express")
const router=express.Router()
const {usageUserType,getallusageUserType,getsingleusageUserType,updateusageUserType,deleteUsageUserData, getUsageDetails}=require('../controllers/usage_user_typeControllers')

router.route("/usageUserType").post(usageUserType)
router.route("/getallusageUserType").get(getallusageUserType)
router.route("/get-usage-details").get(getUsageDetails)
router.route("/getsingleusageUserType/:id").get(getsingleusageUserType)
router.route("/updateusageUserType/:id").put(updateusageUserType)
router.route("/deleteUsageUserData/:id").delete(deleteUsageUserData)






module.exports=router







