const companiesModel = require("../models/companies");

const getSpecificCompany = req => {
  try {
    return companiesModel.find({ name: req.params.company }).orFail();
  } catch (error) {
    console.error(`getSpecificCompany error: ${error}`);
  }
};

module.exports = getSpecificCompany;
