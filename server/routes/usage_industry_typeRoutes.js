const expres=require("express")
const router=expres.Router()
const {usageIndustryType,getallUsageIndustryType,getsingleUsageIndustryType,updateUsageIndustryType,deleteUsageIndustryData}=require("../controllers/usage_industry_typeControllers")


router.route("/usageindustrytype").post(usageIndustryType)
router.route("/allUsageindustrytype").get(getallUsageIndustryType)
router.route("/getsingleUsageIndustryType/:id").get(getsingleUsageIndustryType)
router.route("/updateUsageIndustryType/:id").put(updateUsageIndustryType)
router.route("/deleteUsageIndustryData/:id").delete(deleteUsageIndustryData)



module.exports=router