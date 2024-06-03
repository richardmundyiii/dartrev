const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  createUser,
  loginUser,
};

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
