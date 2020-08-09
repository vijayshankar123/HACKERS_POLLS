const jwt = require("jsonwebtoken");
const config = require("config");

//middleware function to let only logged
//in users to view contents of website

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "authorization denied!!!!" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("JWTSECRET"));
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
