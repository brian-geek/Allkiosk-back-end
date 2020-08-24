// Initialize express router

let router = require("express").Router();
const jwtMiddleware = require("./middlewares/jwt.middleware");

const juror = require("./controllers/juror");
const proxyController = require("./controllers/proxy");

// router
//   .post("/user/login", juror.login)
//   .post("/user/update", jwtMiddleware, juror.updateUserInfo)
//   .get("/user", jwtMiddleware, juror.getUserInfo);

router
  .post("/proxy/login", proxyController.login)
  .post("/proxy/checkIn", proxyController.checkIn)
  .post("/proxy/login/jurorName", proxyController.loginWithJurorName);

module.exports = router;
