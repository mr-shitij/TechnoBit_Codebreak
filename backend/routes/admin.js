const express = require("express");
const Startup = require("../models/Admin");
const bcrypt = require("bcrypt");

const router = express.Router();

// Register a new startup account
router.post("/register", (req, res) => {
  const { name, email, password, phone, location, description } = req.body;
  const startup = new Startup({ name, email, password, phone, location, description });
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send(err);
    startup.password = hash;
    startup.save((err, startup) => {
      if (err) return res.status(500).send(err);
      res.send(startup);
    });
  });
});

// Login a startup account
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Startup.findOne({ email }, (err, startup) => {
    if (err) return res.status(500).send(err);
    if (!startup) return res.status(404).send("Startup not found");
    bcrypt.compare(password, startup.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);
      if (!isMatch) return res.status(401).send("Incorrect password");
      res.send(startup);
    });
  });
});

module.exports = router;
