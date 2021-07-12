const mongoose = require("mongoose");

let versionSchema = new mongoose.Schema({
  _id: Number,
  last_updated: Date
});

module.exports = mongoose.model("Version", versionSchema, "version");
