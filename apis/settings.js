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

const SettingsInfo = sequelize.define(
  "SettingsInfo",
  {
    idleTime: Sequelize.FLOAT,
    resetTime: Sequelize.FLOAT,
    scannerMode: Sequelize.STRING,
    printerMode: Sequelize.STRING,
    name: Sequelize.STRING,
  },
  {
    tableName: "settingsTable",
    timestamps: false,
  }
);

//synchronizing the schema
sequelize
  .sync({ force: true })
  .then(() => {
    SettingsInfo.create({
      idleTime: 0.5,
      resetTime: 5,
      scannerMode: "scanner",
      printerMode: "printer",
      name: "TempeJuror",
    });
  })
  .then((result) => console.log(result))
  .catch((err) => console.log("Problem occured:", err));

const getSettingsInfo = (req, res, next) => {
  SettingsInfo.findAll().then((result) => {
    res.send(result[0]);
  });
};

const setSettingsInfo = (req, res, next) => {
  if (req.body) {
    const { idleTime, resetTime, scannerMode, printerMode, name } = req.body;
    SettingsInfo.update(
      {
        idleTime: idleTime,
        resetTime: resetTime,
        scannerMode: scannerMode,
        printerMode: printerMode,
        name: name,
      },
      { where: { name: name } }
    )
      .then((result) => {
        if (result) {
          res.send({ message: "Updated Successfully.", status: "success" });
        }
      })
      .catch((err) =>
        res.send({ message: "Something failed.", status: "failed" })
      );
  } else {
    res.send({ message: "Something failed.", status: "failed" });
  }
};

router.get("/", getSettingsInfo);
router.post("/", setSettingsInfo);

module.exports = router;
