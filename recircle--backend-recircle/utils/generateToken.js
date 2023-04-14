const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js")

const generateToken = id => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: "30d"
  });
};

module.exports = generateToken;
