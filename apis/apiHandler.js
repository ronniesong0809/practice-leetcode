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
const postQuestionToNotion = require("./postQuestionToNotion");
const getLastUpdated = require("./getLastUpdated");

const env = require("../utils/environment");
const redis = require("redis");
const client = redis.createClient(env.REDIS_URL);

const redisCache = async (key, method, res) => {
  try {
    client.get(key, (error, data) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (data) {
        console.log("Questions retrieved from Redis");
        res.status(200).send(data);
      } else {
        method.then(function (response) {
          const questions = response;
          client.setex(key, 600, JSON.stringify(questions), redis.print);
          console.log("Questions retrieved from MongoDB");
          res.status(200).send(questions);
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getAllQuestions = (req, res) => {
  redisCache("all", getAll(req), res);
};

const getTodayQuestions = (req, res) => {
  redisCache("today", getToday(req), res);
};

const getQuestionsByTag = async (req, res) => {
  const questionList = await getSpecificTopic(req);
  redisCache("tag", getByTag(req, questionList), res);
};

const getQuestionsByCompany = async (req, res) => {
  const questionList = await getSpecificCompany(req);
  redisCache("company", getByCompany(req, questionList), res);
};

const getTopQuestions = async (req, res) => {
  redisCache("top", getTop(req), res);
};

const getRangeOfQuestions = async (req, res) => {
  redisCache("range", getRange(req), res);
};

const getCompanies = async (req, res) => {
  redisCache("companies", getAllCompanies(req), res);
};

const getTopics = async (req, res) => {
  redisCache("topics", getAllTopics(req), res);
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
