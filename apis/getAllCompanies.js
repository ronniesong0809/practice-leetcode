const companiesModel = require("../models/companies");

const getAllCompanies = () => {
  try {
    return companiesModel.find().sort({ count: -1 });
  } catch (error) {
    console.error(`getAllCompanies error: ${error}`);
  }
};

module.exports = getAllCompanies;
