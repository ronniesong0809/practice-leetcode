const questionsModel = require("../models/questions");

const getTodayQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";
  let gte = Number(
    req.query.gte >= 0 && req.query.gte < 4.2 ? req.query.gte : 3.5
  );
  let lte = Number(req.query.lte > gte ? req.query.lte : 5);
  let limit = Number(req.query.limit ? req.query.limit : 10);

  let pipeline = [
    {
      $match: {
        frequency: {
          $gte: gte,
          $lte: lte
        },
        paid_only: {
          $eq: false
        }
      }
    },
    {
      $sample: {
        size: limit
      }
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
        frequency: "$frequency"
      }
    }
  ];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getTodayQuestions error: ${error}`);
  }
};

module.exports = getTodayQuestions;
