const express = require("express");
const _ = require("lodash");
const Task = require("../models/tasks");
const router = new express.Router();

router.get("/projects", async (req, res) => {
  try {
    const foundTasks = await Task.find({});
    res.render("projects", { taskItems: foundTasks });
  } catch (error) {
    console.log(`Error ${error}`);
  }

  //   Task.find({})
  //     .then((tasks) => {
  //       res.render("projects", { taskItems: tasks });
  //     })
  //     .catch((err) => {
  //       res.status(400).send("no tasks in collection");
  //     });
});

router.post("/taskCard", (req, res) => {
  const buttonName = req.body.taskbutton;
  console.log(buttonName, "clicked");
  const newTask = new Task({
    description: _.lowerCase(req.body.taskTitle),
  });

  Task.findOne({ description: newTask.description }, (err, task) => {
    if (err) return err;
    if (task) {
      console.log("task already exists");
      return;
    }
    if (!task) {
      newTask
        .save()
        .then((task) => console.log(task))
        .catch((err) => console.log(err));
    }
    res.redirect("/projects");
  });

  //   Task.findOne({ description: newTask.description }, (err, task) => {
  //     if (!err) {
  //       if (!task) {
  //         newTask
  //           .save()
  //           .then((task) => {
  //             console.log(task);
  //           })
  //           .catch((err) => {
  //             res.status(400).send(err);
  //           });

  //         res.redirect("/projects");
  //       } else {
  //         console.log("task already exists");
  //         res.redirect("/projects");
  //         return;
  //       }
  //     }
  //   });
});

module.exports = router;
