const express = require("express");
const app = express();
require("./database");
const getTodayQuestions = require("./apis/getTodayQuestions");
const getQuestionsByTag = require("./apis/getQuestionsByTag");
const getTopQuestions = require("./apis/getTopQuestions");

const hostname = "localhost";
const port = "8080";

app.get("/foo", (req, res) => {
  res.send("bar");
});

app.get("/today", async (req, res) => {
  res.send(await getTodayQuestions(req));
});

app.get("/tag/:tag", async (req, res) => {
  res.send(await getQuestionsByTag(req));
});

app.get("/top/:top?", async (req, res) => {
  res.send(await getTopQuestions(req));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
