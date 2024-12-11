const usageIndustryType = require("../models/usage_industry_type")

exports.usageIndustryType = async (req, res) => {
  try {
    const { month, year, submitted_by, industryDetails } = req.body;
 

    const promises = industryDetails.map(async (detail) => {
      return await usageIndustryType.create({
        industryType: detail.industryType,
        rtkRegion1: detail.rtkRegion1 || null,
        rtkRegion2: detail.rtkRegion2 || null,
        rdsRegion1: detail.rdsRegion1 || null,
        rdsRegion2: detail.rdsRegion2 || null,
        month,
        year,
        submitted_by,
      });
    });

    const result = await Promise.all(promises);
    res.status(201).json({ success: true, message: 'Data saved successfully!', Data: result });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
exports.getallUsageIndustryType = async (req, res) => {
  try {
    const result = await usageIndustryType.findAll()
    res.status(200).json({ success: true, message: 'Data fetched successfully!', Data: result })
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Unable to getdata data !!!", error })
  }
}

exports.getsingleUsageIndustryType = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await usageIndustryType.findByPk(id)
    if (!result) {
      res.status(404).json({ success: false, message: "Data not found !!!", error })

    } else {
      res.status(200).json({ success: true, message: 'Data fetched successfully !!!', Data: result })
    }

  }
  catch (error) {
    res.status(500).json({ success: false, message: "Unable to getsingledata data !!!", error })

  }
}
exports.updateUsageIndustryType = async (req, res) => {
  try {
    const { month, year, submitted_by, industryDetails } = req.body;
    const id = req.params.id;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required !!!"
      });
    }

    const promises = industryDetails.map(async (detail) => {
      const { industryType, rtkRegion1, rtkRegion2, rdsRegion1, rdsRegion2 } = detail;

      await usageIndustryType.update(
        {
          industryType,
          rtkRegion1: rtkRegion1 || null,
          rtkRegion2: rtkRegion2 || null,
          rdsRegion1: rdsRegion1 || null,
          rdsRegion2: rdsRegion2 || null,
          month,
          year,
          submitted_by
        },
        { where: { id: id } }
      );

      const updatedRecord = await usageIndustryType.findOne({
        where: { id: id },
      });

      return updatedRecord;
    });

    const result = await Promise.all(promises);
    res.status(200).json({ success: true, message: 'Data updated successfully!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
exports.deleteUsageIndustryData = async (req, res) => {
  try {
    const result = await usageIndustryType.findByPk(req.params.id);

    if (result) {
      await result.destroy()
      res.status(200).json({ success: true, message: 'Data deleted successfully !!!' })
    } else {
      res.status(404).json({ success: false, message: 'Data not found !!!' })
    }
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Unable to delete data !!!", error })
  }
}