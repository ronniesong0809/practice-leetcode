const fastify = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const asyncHandler = require("express-async-handler")
const app = fastify();
const env = require("./utils/environment");
const apiHandler = require("./apis/apiHandler");
require("./utils/database");

const hostname = env.HOST || "localhost";
const port = env.PORT || "3000";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/all", asyncHandler(apiHandler.getAllQuestions));
app.get("/today", asyncHandler(apiHandler.getTodayQuestions));
app.get("/tag/:tag?", asyncHandler(apiHandler.getQuestionsByTag));
app.get("/company/:company?", asyncHandler(apiHandler.getQuestionsByCompany));
app.get("/top/:top?", asyncHandler(apiHandler.getTopQuestions));
app.get("/range", asyncHandler(apiHandler.getRangeOfQuestions));
app.get("/companies", asyncHandler(apiHandler.getCompanies));
app.get("/topics", asyncHandler(apiHandler.getTopics));
app.post("/notion", asyncHandler(apiHandler.postToNotion));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
