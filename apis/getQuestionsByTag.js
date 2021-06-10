const questionsModel = require("../models/questions");

const getQuestionsByTag = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let tag = String(req.params.tag ? req.params.tag : "Array");
  let limit = Number(req.query.limit ? req.query.limit : 10);

  let pipeline = [
    {
      $sort: {
        "stat.total_submitted": -1,
        frequency: -1
      }
    },
    {
      $match: {
        "tags.name": {
          $eq: tag
        }
      }
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: 0,
        id: "$stat.question_id",
        title: "$stat.question__title",
        level: "$difficulty.level",
        url: {
          $concat: [baseUrl, "$stat.question__title_slug", "/"]
        },
        tags: "$tags.name",
        frequency: "$frequency"
      }
    }
  ];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getQuestionsByTag error: ${error}`);
  }
};

module.exports = getQuestionsByTag;
