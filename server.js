const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 2000;
const cors = require("cors");
const errorHandler = require("./error-handler");
const sequelize = require("./config/database.connect.js");

let routes = require("./routes");

//import model
const JuryInfo = require("./models/juryInfo");

const initialJuryInfo = require("./config/juror.data.js");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
// app.use("/scanner", scanner);
// app.use("/searchjuror", searchJuror);
// app.use("/settings", settings);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Authentication"
//   );
//   next();
// });

app.use("/api", routes);
app.use("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

//testing a model
sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

//synchronizing the schema
sequelize
  .sync({ force: true })
  .then(() => {
    initialJuryInfo.map((userData) => {
      JuryInfo.create(userData);
    });
  })
  .then((result) => console.log(result))
  .catch((err) => console.log("Problem occured:", err));
