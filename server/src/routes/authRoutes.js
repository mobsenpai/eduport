const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Auth route" });
  } catch (err) {
    // server error i.e
    // client can't fix this
    res.status(500).json({ error: err.message });
  }
});

// register
// post route
router.post("/register", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // if either case is true, it would return the specific
    // database document
    // NOTE: database queries are always a promise, hence use await
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existingUser) {
      // check the returned object againt request body's email
      if (existingUser.email === email) {
        // === triple equality for safety
        res.status(409).json({ error: "Email already exists" });
        return;
      }

      // same for username
      if (existingUser.username === username) {
        res.status(409).json({ error: "Username already exists" });
        return;
      }
    }

    const salt = await bcrypt.genSalt(10);
    // password safe to send via request body
    // it sent over https (encrypted)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      // key (from User model) : variable name
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Data stored" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
