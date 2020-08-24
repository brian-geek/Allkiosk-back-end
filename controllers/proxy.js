const fetch = require("node-fetch");

const SERVER_ENDPOINT = "https://syrejuror1.gs.acs-inc.com:9443/kioskdev/v1";
const siteToken = "1a2b3c";
const courtLocation = "401";

exports.login = async (req, res, next) => {
  const { jurorId } = req.body;
  await fetch(`${SERVER_ENDPOINT}/login/${jurorId}`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      "X-kiosk": `siteToken=${siteToken}@courtLocation=${courtLocation}`,
    },
  })
    .then((res) => res.json())
    .then((result) => res.send(result))
    .catch((err) => {
      throw err;
    });
};

exports.loginWithJurorName = async (req, res, next) => {
  await fetch(`${SERVER_ENDPOINT}/login`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      "X-kiosk": `siteToken=${siteToken}@courtLocation=${courtLocation}`,
    },
    body: JSON.stringify(req.body),
  })
    .then((res) => res.json())
    .then((result) => res.send(result))
    .catch((err) => {
      throw err;
    });
};

exports.checkIn = async (req, res, next) => {
  const { jurorId } = req.body;
  await fetch(`${SERVER_ENDPOINT}/checkIn/${jurorId}`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      "X-kiosk": `siteToken=${siteToken}@courtLocation=${courtLocation}`,
    },
  })
    .then((res) => res.json())
    .then((result) => res.send(result))
    .catch((err) => {
      throw err;
    });
};
