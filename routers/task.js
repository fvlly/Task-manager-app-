const express = require("express");
const _ = require("lodash");
const { protect } = require("../middleware/authMiddleware");
const {
  postTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");
const router = new express.Router();

router.post("/tasks/newTask", protect, postTask);
router.get("/tasks", protect, getTasks);
router.patch("/tasks/:id", protect, editTask);
router.get("/tasks/me", protect, getTask);
router.delete("/tasks/me", protect, deleteTask);

module.exports = router;
