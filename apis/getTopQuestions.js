const questionsModel = require("../models/questions");

const getTopQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let paid = Boolean(req.query.paid ? req.query.paid : false);
  let top = Number(req.params.top >= 0 ? req.params.top : 10);

  let pipeline = [
    {
      $match: {
        paid_only: {
          $eq: paid
        }
      }
    },
    {
      $sort: {
        "stat.total_submitted": -1,
        frequency: -1
      }
    },
    {
      $limit: top
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
    console.error(`getTopQuestions error: ${error}`);
  }
};

module.exports = getTopQuestions;
