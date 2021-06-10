const getToday = require("./getTodayQuestions");
const getByTag = require("./getQuestionsByTag");
const getTop = require("./getTopQuestions");

const getTodayQuestions = async (req, res) => {
  res.send(await getToday(req));
}

const getQuestionsByTag = async (req, res) => {
  res.send(await getByTag(req));
}

const getTopQuestions = async (req, res) => {
  res.send(await getTop(req));
}

module.exports = { getTodayQuestions, getQuestionsByTag, getTopQuestions };
