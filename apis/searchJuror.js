const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const searchJurorFunc = require('../funcs/searchJurorFunc.js');

const initialJuryInfo = [
  {
    text: "6901028095884",
    firstName: "Pace",
    middleName: 'M',
    lastName: "Ellsworth",
    birthDate: "1987-4-21",
    address: "Mesa AZ",
    phone: "480-981-1616",
    jurorId: "paceme999",
    groupId: "tempe999",
    scheduleTime: "2020-5-27 10:10:42 AM",
    nextReportDate: '2020-7-25',
    poolRecordIsActive: true,
    status: 'responded',
  },
  {
    text: "049000069150",
    firstName: "Taylor",
    middleName: 'P',
    lastName: "Ellsworth",
    birthDate: "1990-2-21",
    address: "Mesa AZ",
    phone: "280-481-1231",
    jurorId: "taylor999",
    groupId: "tempe999",
    scheduleTime: "2020-5-27 4:10:42 PM",
    nextReportDate: '2020-7-6',
    poolRecordIsActive: true,
    status: 'panel',
  },
  {
    text: "350502692812985096",
    firstName: "Ned",
    middleName: 'M',
    lastName: "Flanders",
    birthDate: "1980-12-1",
    address: "Tempe AZ",
    phone: "234-223-2351",
    jurorId: "ned999",
    groupId: "tempe999",
    scheduleTime: "2020-7-21 9:40:00 AM",
    nextReportDate: '2020-7-20',
    poolRecordIsActive: true,
    status: 'juror',
  },
  {
    text: "S19170520100037",
    firstName: "Sang",
    middleName: 'S',
    lastName: "Luu",
    birthDate: "1985-5-11",
    address: "Phoenix AZ",
    phone: "188-786-0082",
    jurorId: "sang999",
    groupId: "arizona999",
    scheduleTime: "2020-6-16 8:15:42 PM",
    nextReportDate: '2020-8-1',
    poolRecordIsActive: false,
    status: 'summoned'
  },
];

//connecting to the database
const sequelize = new Sequelize("sql3344977", "sql3344977", "ptGn4MStL8", {
  host: "sql3.freemysqlhosting.net",
  dialect: "mysql",
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

const JuryInfo = sequelize.define(
  "JuryInfo",
  {
    text: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    birthDate: Sequelize.DATEONLY,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    jurorId: Sequelize.STRING,
    groupId: Sequelize.STRING,
    scheduleTime: Sequelize.DATE,
    poolRecordIsActive: Sequelize.BOOLEAN,
    nextReportDate: Sequelize.DATEONLY,
    status: Sequelize.STRING
  },
  {
    tableName: "jurorTable",
    timestamps: false,
  }
);

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

const handleJurorData = (req, res, next) => {
  if (req.body) {
    const { firstName, lastName, birthDate, middleName } = req.body;
    JuryInfo.findOne({
      where: {
       firstName, lastName, middleName, birthDate   
      },
    }).then((result) => {
      if (result) {
        res.send({
          message: "Juror ID Found",
          jurorData: result,
          status: 'success'
        });
      } else {
        res.send({ message: "Juror ID Not Found", status: 'failed'});
      }
    });
  } else {
    res.send({ message: "Error ocurred.", status: 'failed'});
  }
};

const handleScannedData = (req, res, next) => {
  const text = req.body.text;
  JuryInfo.findOne({
    where: {
      text: text,
    },
  })
    .then((result) => {
      if (result) {
        res.send({
          message: "Juror ID Match Found.",
          status: "success",
          token: jwt.sign({ result }, config.secret_config)
        });
      } else {
        res.send({ message: "Juror ID Match Not Found. Enter Name and Date of Birth.", status: "failed" });
      }
    })
    .catch((err) => {
      throw err;
    });
};

router.post("/", handleJurorData);
router.post("/scanner", handleScannedData);

module.exports = router;
