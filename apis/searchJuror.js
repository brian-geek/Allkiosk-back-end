const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();

const initialJuryInfo = [
  {
    text: "6901028095884",
    firstName: "Pace",
    lastName: "Ellsworth",
    birthDate: "1987-4-21",
    address: "Mesa AZ",
    phone: "480-981-1616",
    jurorId: "paceme999",
    groupId: "tempe999",
    scheduleTime: "2020-5-27 10:10:42 AM",
  },
  {
    text: "049000069150",
    firstName: "Taylor",
    lastName: "Ellsworth",
    birthDate: "1990-2-21",
    address: "Mesa AZ",
    phone: "280-481-1231",
    jurorId: "taylor999",
    groupId: "tempe999",
    scheduleTime: "2020-5-27 4:10:42 PM",
  },
  {
    text: "350502692812985096",
    firstName: "Ned",
    lastName: "Flanders",
    birthDate: "1980-12-1",
    address: "Tempe AZ",
    phone: "234-223-2351",
    jurorId: "ned999",
    groupId: "tempe999",
    scheduleTime: "2020-7-21 9:40:00 AM",
  },
  {
    text: "S19170520100037",
    firstName: "Sang",
    lastName: "Luu",
    birthDate: "1985-5-11",
    address: "Phoenix AZ",
    phone: "188-786-0082",
    jurorId: "sang999",
    groupId: "arizona999",
    scheduleTime: "2020-6-16 8:15:42 PM",
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
    lastName: Sequelize.STRING,
    birthDate: Sequelize.DATEONLY,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    jurorId: Sequelize.STRING,
    groupId: Sequelize.STRING,
    scheduleTime: Sequelize.DATE,
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
    const { firstName, lastName, birthDate, jurorId, groupId } = req.body;
    JuryInfo.findOne({
      where: {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        jurorId: jurorId,
        groupId: groupId,
      },
    }).then((result) => {
      if (result) {
        res.send({
          message: "Juror ID Found",
          status: "success",
          jurorData: result,
        });
      } else {
        res.send({ message: "Juror ID Not Found", status: "failed" });
      }
    });
  } else {
    res.send({ message: "Error ocurred.", status: "failed" });
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
          message: "Bar Code Found",
          status: "success",
          jurorData: result,
        });
      } else {
        res.send({ message: "Bar Code Not Found", status: "failed" });
      }
    })
    .catch((err) => {
      throw err;
    });
};

router.post("/", handleJurorData);
router.post("/scanner", handleScannedData);

module.exports = router;
