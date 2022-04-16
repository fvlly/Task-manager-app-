const express = require("express");
const _ = require("lodash");
const User = require("../models/users");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newUser.save();
    console.log("successfly logged new user");
    res.redirect("/dashboard");
  } catch (error) {
    console.log(`Error ${error}`);
  }

  //   newUser
  //     .save()
  //     .then(() => {
  //       console.log(newUser);
  //       res.redirect("/dashboard");
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
