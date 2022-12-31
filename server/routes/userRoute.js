const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// GET current Users
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      id: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(400).json("GET Error: " + err);
  }
});

// POST endpoint to register a new user
router.post("/register", async (req, res) => {
  const { username, password, passwordCheck } = req.body;

  // Validation
  try {
    if (!username || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: "Please ensure all required fields are submitted." });
    if (password !== passwordCheck)
      return res.status(400).json({ msg: "The passwords do not match." });

    // Check user doesn't already exist
    User.find({ username: username }, (err, prevUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error.",
        });
      } else if (prevUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exists.",
        });
      }
    });

    // Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    // email and password are provided
    if (!username || !password)
      return res
        .status(400)
        .json({ msg: "Please ensure all required fields are submitted." });

    // user is registered
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(400).json({ msg: "That account does not exist." });

    // password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    console.log("User exists in database, password OK!");

    // respond to login
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete logged in user
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if user token is valid
router.post("/isTokenValid", async (req, res) => {
  try {
    // Validate
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verifiedUser) return res.json(false);

    const user = User.findById(verifiedUser.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
