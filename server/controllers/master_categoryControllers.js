const Master_category = require("../models/Master_category");

exports.addMasterCategory = async (req, res) => {
  try {
    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const Data = new Master_category(req.body);
    Data.Browser = Browser;
    Data.ipaddress = ipaddress;

    await Data.save();

    res.status(201).send({
      message: "New category has been created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in adding master category",
      success: false,
      error,
    });
  }
};

exports.getMasterCategory = async (req, res) => {
  try {
    const masterCategoryData = await Master_category.findAll({});

    if (masterCategoryData.length === 0) {
      return res.status(200).send({ message: "Data not found", success: true, data: masterCategoryData });
    }
    res.status(200).send({
      message: "Master category found successfully",
      success: true,
      data: masterCategoryData,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in getting master category details",
      success: false,
      error,
    });
  }
};

exports.updateMasterCategory = async (req, res) => {
  try {
    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const category = await Master_category.findOne({
      where: { sno: req.params.sno },
    });

    if (!category) {
      return res
        .status(404)
        .send({ message: "Category does not exist", success: false });
    }

    const name = req.body.name;

    category.name = name;
    category.Browser = Browser;
    category.ipaddress = ipaddress;

    await category.save();

    res
      .status(200)
      .send({ message: "Category updated successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in category updation", success: false, error });
  }
};

exports.deleteMasterCategory = async (req, res) => {
    try {
        
        const category = await Master_category.findOne({ where: { sno: req.body.sno }});

        if(!category){
            return res.status(404).send({ message: "Data not found", success: false })
        }

        await category.destroy();
        
        res.status(200).send({ message: "Category deleted successfully", success: true })
    } catch (error) {
        res.status(500).send({ message: "Error in master category deletion", success: false, error })
    }
};
