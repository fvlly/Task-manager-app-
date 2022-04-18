const express = require("express");
const _ = require("lodash");
const User = require("../models/users");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/dashboard", getUser);

module.exports = router;
