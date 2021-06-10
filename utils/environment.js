const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE
};
