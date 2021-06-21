const mongoose = require("mongoose");

let companiesSchema = new mongoose.Schema({
  _id: Number,
  slug: String,
  name: String,
  questions: Array,
  count: Number
});

module.exports = mongoose.model("Companies", companiesSchema, "companies");
