const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    res.status(200).send("Auth route");
  } catch (err) {
    // server error i.e
    // client can't fix this
    res.status(500).send(err.message);
  }
});

module.exports = router;
