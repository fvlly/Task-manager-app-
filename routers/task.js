const express = require("express");
const _ = require("lodash");
const {
  postTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");
const router = new express.Router();

router.post("/tasks/newTask", postTask);
router.get("/tasks/:id", getTasks);
router.patch("/tasks/:id", editTask);
router.get("/tasks/me", getTask);
router.delete("/tasks/me", deleteTask);

module.exports = router;
