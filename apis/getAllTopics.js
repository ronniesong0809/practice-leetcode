const topicsModel = require("../models/topics");

const getAllTopics = () => {
  try {
    return topicsModel.find();
  } catch (error) {
    console.error(`getAllTopics error: ${error}`);
  }
};

module.exports = getAllTopics;
