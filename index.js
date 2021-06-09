const express = require("express");
const app = express();

require("./database")

const hostname = "localhost";
const port = "8080";

app.get("/foo", (req, res) => {
  res.send("bar");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
