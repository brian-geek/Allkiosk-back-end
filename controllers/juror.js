const JuryInfo = require("../models/juryInfo.js");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const createToken = require("../helper/token.create");

moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

const selectFindFunc = (req) => {
  const { text, firstName, middleName, lastName, birthDate } = req.body;
  console.log();
  if (text) {
    return JuryInfo.findOne({
      where: {
        text,
      },
    });
  } else if (firstName && lastName) {
    return JuryInfo.findOne({
      where: {
        firstName: firstName,
        lastName: lastName,
      },
    });
  } else if (birthDate) {
    return JuryInfo.findOne({
      where: {
        birthDate,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  selectFindFunc(req)
    .then((data) => {
      console.log("data", data);
      if (data) {
        const { poolRecordIsActive, status, text, nextReportDate } = data;
        if (
          poolRecordIsActive === "Y" &&
          status === 2 &&
          moment(new Date()).format("YYYY-MM-DD") ===
            moment(nextReportDate).format("YYYY-MM-DD")
        ) {
          res.status(200).send({ token: createToken(text), jurorData: data });
        } else {
          res.status(402).send("Juror Info is invalid");
        }
      } else {
        res.status(401).send("Juror Info is invalid");
      }
    })
    .catch((err) => {
      res.status(401).send("Juror Info is invalid");
    });
};

exports.getUserInfo = async (req, res, next) => {
  const { text } = res.locals;
  JuryInfo.findOne({
    where: {
      text,
    },
  })
    .then((data) => {
      console.log("data", data);
      if (data) {
        const { poolRecordIsActive, status, text, nextReportDate } = data;
        if (
          poolRecordIsActive === "Y" &&
          status === 2 &&
          moment(new Date()).format("YYYY-MM-DD") ===
            moment(nextReportDate).format("YYYY-MM-DD")
        ) {
          res.status(200).send({ token: createToken(text), jurorData: data });
        } else {
          res.status(402).send("Juror Info is invalid");
        }
      }
    })
    .catch((err) => {
      res.status(402).send("Juror Info is invalid.");
    });
};
