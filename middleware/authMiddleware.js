const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authorization")?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token não é válido" });
  }
};
