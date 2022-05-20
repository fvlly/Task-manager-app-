const express = require("express");
const _ = require("lodash");
const User = require("../models/users");
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return new Error("Please upload file in jpg or png format");
    }

    cb(undefined, true);
  },
});

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  postAvatar,
  getAvatar,
  deleteAvatar,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = new express.Router();

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

router.get("/users/me", protect, getUser);

router.patch("/users/me", protect, updateUser);

router.delete("/users/me", protect, deleteUser);

//  upload avatar
router.post(
  "/users/upload",
  protect,
  upload.single("avatar"),
  postAvatar,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// get avatar
router.get("/users/:id/avatar", protect, getAvatar);

//delete avatar
router.delete("/users/me/avatar", protect, deleteAvatar);

module.exports = router;
