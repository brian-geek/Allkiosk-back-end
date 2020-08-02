const Sequelize = require("sequelize");
const sequelize = require("../config/database.connect.js");

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
    poolRecordIsActive: Sequelize.STRING,
    nextReportDate: Sequelize.DATEONLY,
    status: Sequelize.INTEGER,
    courtLocation: Sequelize.STRING,
  },
  {
    tableName: "jurorTable",
    timestamps: false,
  }
);

module.exports = JuryInfo;
