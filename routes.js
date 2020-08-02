// Initialize express router

let router = require("express").Router();
const jwtMiddleware = require("./middlewares/jwt.middleware");

const juror = require("./controllers/juror");

router
  .post("/user/login", juror.login)
  .post("/user", jwtMiddleware, juror.getUserInfo);

module.exports = router;
