const jwt = require("jsonwebtoken");
const key = require("../config/token.key.js");

// Create token
const creatToken = (jurorId) => `XKiosk ${jwt.sign(jurorId, key.secret)}`;

module.exports = creatToken;
