const mongoose = require("mongoose");

let questionsSchema = new mongoose.Schema({
  question_id: Number,
  question__title: String,
  question__title_slug: String,
  question__hide: Boolean,
  total_acs: Number,
  total_submitted: Number,
  is_new_question: Boolean,
  difficulty: Number,
  paid_only: Boolean,
  is_favor: Boolean,
  frequency: Number,
  progress: Number
});

module.exports = mongoose.model("Questions", questionsSchema, "algorithms");
