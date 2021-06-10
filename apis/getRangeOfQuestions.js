const questionsModel = require("../models/questions");

const getRangeOfQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let gte = Number(req.query.gte >= 0 ? req.query.gte : 200);
  let lte = Number(req.query.lte > gte ? req.query.lte : 300);
  let limit = Number(req.params.limit >= 0 ? req.params.limit : 10);

  let pipeline = [
    {
      $match: {
        "stat.question_id": {
          $gte: gte,
          $lte: lte
        }
      }
    },
    {
      $sort: {
        "stat.question_id": 1
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
          $concat: [baseUrl, "$stat.question__title_slug"]
        },
        tags: "$tags.name",
        frequency: "$frequency"
      }
    }
  ];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getRangeOfQuestions error: ${error}`);
  }
};

module.exports = getRangeOfQuestions;
