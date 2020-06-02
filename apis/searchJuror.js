const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();

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
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    birthDate: Sequelize.DATE,
    jurorId: Sequelize.STRING,
    groupId: Sequelize.STRING,
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
    JuryInfo.create({
      firstName: "Pace",
      lastName: "Ellsworth",
      birthDate: "1990-5-15",
      jurorId: "paceme999",
      groupId: "tempe999",
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
        res.send({ message: "Recognized Jury", status: "success" });
      } else {
        res.send({ message: "Unrecognized Data", status: "failed" });
      }
    });
  } else {
    res.send({ message: "Error ocurred.", status: "failed" });
  }
};

router.post("/", handleJurorData);

module.exports = router;
