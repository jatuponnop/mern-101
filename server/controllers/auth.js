const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   POST    localhost:8000/api/register
// @desc    route   register
// @access  Public
exports.createRegister = async (req, res) => {
  try {
    const { name, password } = req.body;
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, password });
    // Encrypt password
    const salt = await bcrypt.getSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // payload return jsonweb token
    const payload = {
      user: {
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

// @route   POST    localhost:8000/api/login
// @desc    route   login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    // Check user
    let user = await User.findOneAndUpdate({ name }, { new: true });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials #1" });
    }
    // Compare Encrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials #2" });
    }
    // payload return jsonweb token
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: "30h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

// @route   POST    localhost:8000/api/current-user
// @desc    route   current-user
// @access  Private
exports.currentUser = async (req, res) => {
  User.findOne({ name: req.user.name })
    .select("-password")
    .exec((err, user) => {
      if (err) throw new Error(err);
      res.json(user);
    });
};
