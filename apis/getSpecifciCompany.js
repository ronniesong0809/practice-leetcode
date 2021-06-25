const companiesModel = require("../models/companies");

const getSpecifciCompany = req => {
  try {
    return companiesModel.find({ name: req.params.company });
  } catch (error) {
    console.error(`getSpecifciCompany error: ${error}`);
  }
};

module.exports = getSpecifciCompany;
