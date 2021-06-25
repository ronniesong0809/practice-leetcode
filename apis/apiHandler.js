const getAll = require("./getAllQuestions");
const getToday = require("./getTodayQuestions");
const getByTag = require("./getQuestionsByTag");
const getByCompany = require("./getQuestionsByCompany");
const getTop = require("./getTopQuestions");
const getRange = require("./getRangeOfQuestions");
const getAllCompanies = require("./getAllCompanies");
const getSpecifciCompany = require("./getSpecifciCompany");
const getAllTopics = require("./getAllTopics");

const getAllQuestions = async (req, res) => {
  res.send(await getAll(req));
};

const getTodayQuestions = async (req, res) => {
  res.send(await getToday(req));
};

const getQuestionsByTag = async (req, res) => {
  res.send(await getByTag(req));
};

const getQuestionsByCompany = async (req, res) => {
  const questionList = await getSpecifciCompany(req);
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

module.exports = {
  getAllQuestions,
  getTodayQuestions,
  getQuestionsByTag,
  getQuestionsByCompany,
  getTopQuestions,
  getRangeOfQuestions,
  getCompanies,
  getTopics
};
