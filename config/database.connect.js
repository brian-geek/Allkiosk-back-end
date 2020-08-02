const Sequelize = require("sequelize");

//connecting to the database
const sequelize = new Sequelize("sql3344977", "sql3344977", "ptGn4MStL8", {
  host: "sql3.freemysqlhosting.net",
  dialect: "mysql",
});

module.exports = sequelize;
