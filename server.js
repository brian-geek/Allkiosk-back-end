const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 2000;
const cors = require("cors");
const errorHandler = require("./error-handler");
const scanner = require("./apis/scanner");
const searchJuror = require("./apis/searchJuror");
const settings = require("./apis/settings");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use("/scanner", scanner);
app.use("/searchjuror", searchJuror);
app.use("/settings", settings);

app.use(errorHandler);
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
