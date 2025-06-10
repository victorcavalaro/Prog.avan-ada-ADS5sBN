module.exports = function (req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "Acesso negado. Requer privilégios de administrador." });
  }
};
