const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../models/database");

const SECRET_KEY = "your_secret_key";
const TOKEN_EXPIRATION = "5m";

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });
    res.json({ token });
  });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
