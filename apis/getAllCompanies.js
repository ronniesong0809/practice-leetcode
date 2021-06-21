const companiesModel = require("../models/companies");

const getAllCompanies = () => {
  try {
    return companiesModel.find();
  } catch (error) {
    console.error(`getAllCompanies error: ${error}`);
  }
};

module.exports = getAllCompanies;
