const express = require("express");
const _ = require("lodash");
const User = require("../models/users");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

router.get("/users/me", protect, getUser);

router.patch("/users/me", protect, updateUser);

router.delete("/users/me", protect, deleteUser);

module.exports = router;
