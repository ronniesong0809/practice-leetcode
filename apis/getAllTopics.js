const topicsModel = require("../models/topics");

const getAllTopics = () => {
  try {
    return topicsModel.find().sort({ count: -1 }).orFail();
  } catch (error) {
    console.error(`getAllTopics error: ${error}`);
  }
};

module.exports = getAllTopics;
