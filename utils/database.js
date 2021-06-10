const mongoose = require("mongoose");
const env = require("./environment");

const server = env.MONGODB_URL || "localhost:27017";
const database = env.MONGODB_DATABASE || "leetcode";

class DataBase {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log(`Database ${database} connection successful!`);
      })
      .catch(error => {
        console.error(`Database ${database} connection error: ${error}`);
      });
  }
}

module.exports = new DataBase();
