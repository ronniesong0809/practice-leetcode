const mongoose = require("mongoose");

const server = "localhost:27017";
const database = "leetcode";

class DataBase {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`, {
        useNewUrlParser: true
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
