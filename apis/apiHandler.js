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
const redisCache = require("../utils/cache");

const getAllQuestions = (req, res) => {
  redisCache("all", getAll(req), res);
};

const getTodayQuestions = (req, res) => {
  redisCache("today", getToday(req), res);
};

const getQuestionsByTag = async (req, res) => {
  try {
    client.get(`tagList/${req.params.tag}`, (error, data) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (data) {
        console.log("[tag] list retrieved from Redis");
        redisCache(
          `tag/${req.params.tag}`,
          getByTag(req, JSON.parse(data)),
          res
        );
      } else {
        getSpecificTopic(req).then(function (response) {
          const data = response;
          client.setex(`tagList/${req.params.tag}`, 3600, JSON.stringify(data));
          console.log(`[tag] list retrieved from MongoDB`);
          redisCache(`tag/${req.params.tag}`, getByTag(req, data), res);
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getQuestionsByCompany = async (req, res) => {
  try {
    client.get(`companyList/${req.params.company}`, (error, data) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (data) {
        console.log("[company] list retrieved from Redis");
        redisCache(
          `company/${req.params.company}`,
          getByCompany(req, JSON.parse(data)),
          res
        );
      } else {
        getSpecificCompany(req).then(function (response) {
          const data = response;
          client.setex(`companyList/${req.params.company}`, 3600, JSON.stringify(data));
          console.log(`[company] list retrieved from MongoDB`);
          redisCache(
            `company/${req.params.company}`,
            getByCompany(req, data),
            res
          );
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
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
