const questionsModel = require("../models/questions");

const getTodayQuestions = req => {
  let gte = Number(
    req.params.gte && req.params.gte >= 0 && req.params.gte < 4.2
      ? req.params.gte
      : 3.5
  );
  let lte = Number(req.params.lte && req.params.lte > gte ? req.params.lte : 5);
  console.log(`gte: ${gte}\nlte: ${lte}\n`);

  let pipeline = [
    {
      $sort: {
        "stat.total_submitted": -1,
        frequency: -1
      }
    },
    {
      $match: {
        frequency: {
          $gte: gte,
          $lte: lte
        }
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
