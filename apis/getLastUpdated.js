const versionModel = require("../models/version");

const getLastUpdated = () => {
  try {
    return versionModel.find();
  } catch (error) {
    console.error(`getLastUpdated error: ${error}`);
  }
};

module.exports = getLastUpdated;
