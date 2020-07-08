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

const JuryCode = sequelize.define(
  "JuryCode",
  {
    type: Sequelize.STRING,
    text: Sequelize.STRING,
  },
  {
    tableName: "barCodeTable",
    timestamps: false,
  }
);

//synchronizing the schema
sequelize
  .sync({ force: true })
  .then(() => {
    JuryCode.create({
      type: "ean_13",
      text: "6901028095884",
      firstName: "Pace",
      lastName: "Ellsworth",
      birthDate: "1987-4-21",
      jurorId: "paceme999",
      groupId: "tempe999",
    });
  })
  .then((result) => console.log(result))
  .catch((err) => console.log("Problem occured:", err));

const handleScannedData = (req, res, next) => {
  const type = req.body.format;
  const text = req.body.text;
  JuryCode.findOne({
    where: {
      type: type,
      text: text,
    },
  })
    .then((result) => {
      if (result) {
        res.send({ message: "Recognized Jury", status: "success" });
      } else {
        res.send({ message: "Bar Code Not Found", status: "failed" });
      }
    })
    .catch((err) => {
      throw err;
    });
};

const getScanData = (req, res, next) => {
  res.send("Do u want to get signal?");
};

const saveScannedData = (req, res, next) => {
  if (req.body) {
    const type = req.body.format;
    const text = req.body.text;
    JuryCode.findOne({
      where: {
        type: type,
        text: text,
      },
    }).then((result) => {
      if (result) {
        res.send({ message: "Already saved Data", status: "success" });
      } else {
        JuryCode.create({ type, text })
          .then(() =>
            res.send({ message: "Saved successfully!", status: "success" })
          )
          .catch((err) => {
            throw err;
          });
      }
    });
  } else {
    res.send({ message: "No Scanned Data", status: "failed" });
  }
};

router.post("/", handleScannedData);
router.post("/save", saveScannedData);
router.get("/", getScanData);

module.exports = router;
