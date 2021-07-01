const l2n = require("@ronniesong0809/leetcode2notion");

const postQuestionToNotion = async(req) => {
  l2n.config(process.env.NOTION_KEY, process.env.NOTION_DATABASE_ID);
  l2n.addQuestionToNotion(req.body.id);
};

module.exports = postQuestionToNotion;
