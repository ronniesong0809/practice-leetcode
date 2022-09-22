const mongoose = require("mongoose");
const env = require("./environment");

const server = env.MONGODB_URL || "mongodb://localhost:27017";
const username = env.MONGODB_USER || "admin";
const password = env.MONGODB_PASS || "admin";
const database = env.MONGODB_DATABASE || "leetcode";

class DataBase {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`${server}/${database}`, {
        auth: {
          user: username,
          password: password
        },
        authSource:"admin",
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
