const fastify = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = fastify();
const env = require("./utils/environment");
const apiHandler = require("./apis/apiHandler");
require("./utils/database");
const dotenv = require("dotenv");
dotenv.config();

const hostname = env.HOST || "localhost";


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

app.listen(process.env.PORT || "3000", () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
