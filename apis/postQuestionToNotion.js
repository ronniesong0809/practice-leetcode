const l2n = require("@ronniesong0809/leetcode2notion");

const postQuestionToNotion = async(req) => {
  console.log(req.body);
  l2n.config(process.env.NOTION_KEY, process.env.NOTION_DATABASE_ID);
  return await l2n.addQuestionToNtion(req.body.id);
};

module.exports = postQuestionToNotion;
