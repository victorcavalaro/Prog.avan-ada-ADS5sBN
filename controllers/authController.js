const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const isMatch = await bcrypt.compare(password, user.password);
  const payload = { user: { id: user.id, role: user.role } };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
