const questionsModel = require("../models/questions");

const getTopQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let paid = Boolean(req.query.paid ? req.query.paid : false);

  let match = {
    $match: {
      paid_only: {
        $eq: paid
      }
    }
  };

  let sort = {
    $sort: {
      frequency: -1,
      "stat.total_submitted": -1
    }
  };

  let top = {
    $limit: Number(req.params.top)
  };

  let project = {
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
  };

  let pipeline =
    req.params.top >= 0
      ? [match, sort, top, project]
      : [match, sort, project];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getTopQuestions error: ${error}`);
  }
};

module.exports = getTopQuestions;
