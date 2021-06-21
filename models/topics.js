const mongoose = require("mongoose");

let topicsSchema = new mongoose.Schema({
  _id: Number,
  slug: String,
  name: String,
  questions: Array,
  count: Number
});

module.exports = mongoose.model("Topics", topicsSchema, "topics");
