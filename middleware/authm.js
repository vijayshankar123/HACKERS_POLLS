const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

//middleware function to let only logged
//in admins to view and edit contents of website

module.exports = async function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "authorization denied!" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("JWTSECRET"));
    req.user = decoded.user;

    const admin = await User.findById(req.user.id);
    if (admin.role === "admin") return next();
    else {
      return res.status(401).json({ msg: "authorization denied!!!" });
    }
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
