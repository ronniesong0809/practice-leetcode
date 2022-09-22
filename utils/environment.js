const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASS: process.env.MONGODB_PASS,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
  REDIS_URL: process.env.REDIS_URL
};
