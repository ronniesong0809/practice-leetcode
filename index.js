const express = require("express");
const app = express();
const apiHandler = require("./apis/apiHandler");
require("./database");

const hostname = "localhost";
const port = "8080";

app.get("/foo", (req, res) => {
  res.send("bar");
});

app.get("/today", apiHandler.getTodayQuestions);
app.get("/tag/:tag", apiHandler.getQuestionsByTag);
app.get("/top/:top?", apiHandler.getTopQuestions);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
