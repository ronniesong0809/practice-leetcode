const fastify = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const app = fastify();
const env = require("./utils/environment");
const apiHandler = require("./apis/apiHandler");
require("./utils/database");

const hostname = env.HOST || "localhost";
const port = env.PORT || "3000";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/all", apiHandler.getAllQuestions);
app.get("/today", apiHandler.getTodayQuestions);
app.get("/tag/:tag?", apiHandler.getQuestionsByTag);
app.get("/company/:company?", apiHandler.getQuestionsByCompany);
app.get("/top/:top?", apiHandler.getTopQuestions);
app.get("/range", apiHandler.getRangeOfQuestions);
app.get("/companies", apiHandler.getCompanies);
app.get("/topics", apiHandler.getTopics);
app.get("/lastUpdated", apiHandler.getLastUpdatedDate);
app.post("/notion", apiHandler.postToNotion);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
