const questionsModel = require("../models/questions");
// const companiesModel = require("../models/companies");

const getQuestionsByCompany = (req, val) => {
  const baseUrl = "https://leetcode.com/problems/";

  let companyList = val[0].questions.map(i => Number(i));

  let sort = {
    $sort: {
      "stat.total_submitted": -1,
      frequency: -1
    }
  };

  // let match = {
  //   $match: {
  //     "companyTags.name": {
  //       $regex: company,
  //       $options: "i"
  //     }
  //   }
  // };

  let match = {
    $match: {
      "stat.frontend_question_id": {
        $in: companyList
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
    console.error(`getQuestionsByCompany error: ${error}`);
  }
};

module.exports = getQuestionsByCompany;
