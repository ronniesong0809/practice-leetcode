const questionsModel = require("../models/questions");

const getAllQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let match = {
    $match: {
      paid_only: {
        $eq: req.query.paid
      }
    }
  };

  let sort = {
    $sort: {
      "stat.question_id": 1
    }
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
      similarQuestions: "$similarQuestions",
      companies: "$companyTags.name",
      companyStats: "$companyTagStats",
      frequency: "$frequency"
    }
  };

  let pipeline =
    req.query.paid === undefined ? [sort, project] : [match, sort, project];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getAllQuestions error: ${error}`);
  }
};

module.exports = getAllQuestions;
