const questionsModel = require("../models/questions");

const getTodayQuestions = req => {
  const baseUrl = "https://leetcode.com/problems/";

  let gte = Number(
    req.query.gte >= 0 && req.query.gte < 4.2 ? req.query.gte : 3.5
  );
  let lte = Number(req.query.lte > gte ? req.query.lte : 5);
  let paid = Boolean(req.query.paid ? req.query.paid : false);

  let match = {
    $match: {
      frequency: {
        $gte: gte,
        $lte: lte
      },
      paid_only: {
        $eq: paid
      }
    }
  };

  let sample = {
    $sample: {
      size: Number(req.query.limit)
    }
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
      frequency: "$frequency"
    }
  };

  let pipeline =
    req.query.limit >= 0 ? [match, sample, project] : [match, project];

  try {
    return questionsModel.aggregate(pipeline);
  } catch (error) {
    console.error(`getTodayQuestions error: ${error}`);
  }
};

module.exports = getTodayQuestions;
