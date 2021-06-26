const topicsModel = require("../models/topics");

const getSpecificTopic = req => {
  try {
    return topicsModel.find({ name: req.params.tag });
  } catch (error) {
    console.error(`getSpecificTopic error: ${error}`);
  }
};

module.exports = getSpecificTopic;
