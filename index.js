const fastify = require("express");
const cors = require("cors");
const app = fastify();
const env = require("./utils/environment");
const apiHandler = require("./apis/apiHandler");
require("./utils/database");

const hostname = env.HOST || "localhost";
const port = env.PORT || "3000";

app.use(cors());

app.get("/today", apiHandler.getTodayQuestions);
app.get("/tag/:tag?", apiHandler.getQuestionsByTag);
app.get("/top/:top?", apiHandler.getTopQuestions);
app.get("/range", apiHandler.getRangeOfQuestions);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
