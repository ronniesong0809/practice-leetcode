const questionsModel = require("../models/questions")

const getTodayQuestions = () => {
  let pipeline = [
    {
      '$sort': {
        'stat.total_submitted': -1, 
        'frequency': -1
      }
    }, {
      '$match': {
        'frequency': {
          '$gte': 3.5
        }
      }
    }, {
      '$sample': {
        'size': 4
      }
    }
  ]
  
  try {
    return questionsModel.aggregate(pipeline)
  } catch (error) {
    console.error(`getTodayQuestions error: ${error}`);
  }
}

module.exports = getTodayQuestions