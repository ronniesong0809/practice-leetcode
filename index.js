const express = require("express");
const app = express();
require("./database");
const getTodayQuestions = require("./apis/getTodayQuestions");

const hostname = "localhost";
const port = "8080";

app.get("/foo", (req, res) => {
  res.send("bar");
});

app.get("/todayQuestions", async (req, res) => {
  res.send(await getTodayQuestions(req));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
