const questionsModel = require("../models/questions");

const getQuestionsByTag = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let tag = String(req.params.tag ? req.params.tag : ".*");

  let sort = {
    $sort: {
      "stat.total_submitted": -1,
      frequency: -1
    }
  };

  let match = {
    $match: {
      "tags.name": {
        $regex: tag,
        $options: "i"
      }
    }
  };

  let limit = {
    $limit: req.query.limit
  };

  let project = {
    $project: {
      _id: 0,
      id: "$stat.question_id",
      title: "$stat.question__title",
      level: "$difficulty.level",
      url: {
        $concat: [baseUrl, "$stat.question__title_slug", "/"]
      },
      tags: "$tags.name",
      similarQuestions: "$similarQuestions",
      companies: "$companyTags.name",
      companyStats: "$companyTagStats",
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
    console.error(`getQuestionsByTag error: ${error}`);
  }
};

module.exports = getQuestionsByTag;
