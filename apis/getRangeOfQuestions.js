const questionsModel = require("../models/questions");

const getRangeOfQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let gte = Number(req.query.gte >= 0 ? req.query.gte : 200);
  let lte = Number(req.query.lte > gte ? req.query.lte : 300);

  let match = {
    $match: {
      "stat.question_id": {
        $gte: gte,
        $lte: lte
      }
    }
  };

  let sort = {
    $sort: {
      "stat.question_id": 1
    }
  };

  let limit = {
    $limit: Number(req.query.limit)
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
    req.query.limit >= 0
      ? [match, sort, limit, project]
      : [match, sort, project];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getRangeOfQuestions error: ${error}`);
  }
};

module.exports = getRangeOfQuestions;
