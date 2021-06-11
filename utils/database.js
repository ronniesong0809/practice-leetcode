const mongoose = require("mongoose");
const env = require("./environment");

const server = env.MONGODB_URL || "mongodb://localhost:27017";
const database = env.MONGODB_DATABASE || "leetcode";
console.log(server)
class DataBase {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`${server}/${database}?retryWrites=true&w=majority`, {
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
