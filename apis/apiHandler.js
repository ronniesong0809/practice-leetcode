const getAll = require("./getAllQuestions");
const getToday = require("./getTodayQuestions");
const getByTag = require("./getQuestionsByTag");
const getByCompany = require("./getQuestionsByCompany");
const getTop = require("./getTopQuestions");
const getRange = require("./getRangeOfQuestions");
const getAllCompanies = require("./getAllCompanies");
const getSpecificCompany = require("./getSpecificCompany");
const getAllTopics = require("./getAllTopics");
const getSpecificTopic = require("./getSpecificTopic");
const postQuestionToNotion = require("./postQuestionToNotion")
const getLastUpdated = require("./getLastUpdated")

const getAllQuestions = async (req, res) => {
  res.send(await getAll(req));
};

const getTodayQuestions = async (req, res) => {
  res.send(await getToday(req));
};

const getQuestionsByTag = async (req, res) => {
  const questionList = await getSpecificTopic(req);
  // console.log(questionList);
  res.send(await getByTag(req, questionList));
};

const getQuestionsByCompany = async (req, res) => {
  const questionList = await getSpecificCompany(req);
  // console.log(questionList);
  res.send(await getByCompany(req, questionList));
};

const getTopQuestions = async (req, res) => {
  res.send(await getTop(req));
};

const getRangeOfQuestions = async (req, res) => {
  res.send(await getRange(req));
};

const getCompanies = async (req, res) => {
  res.send(await getAllCompanies(req));
};

const getTopics = async (req, res) => {
  res.send(await getAllTopics(req));
};

const getLastUpdatedDate = async (req, res) => {
  res.send(await getLastUpdated(req));
};

const postToNotion = async (req, res) => {
  res.send(await postQuestionToNotion(req));
};

module.exports = {
  getAllQuestions,
  getTodayQuestions,
  getQuestionsByTag,
  getQuestionsByCompany,
  getTopQuestions,
  getRangeOfQuestions,
  getCompanies,
  getTopics,
  getLastUpdatedDate,
  postToNotion
};
