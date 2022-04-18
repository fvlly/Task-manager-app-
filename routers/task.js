const express = require("express");
const _ = require("lodash");
const { postTask, getTasks } = require("../controllers/taskController");
const router = new express.Router();

router.get("/projects", getTasks);

router.post("/newTask", postTask);
//   const newTask = new Task({
//     description: _.lowerCase(req.body.newTask),
//     inProgress:(req.body.inProgress==="true"),
//     completed:(req.body.completed==="true")
//   });

//   Task.findOne({ description: newTask.description }, (err, task) => {
//     if (err) return err;
//     if (task) return console.log("task already exists");
//     if (!task) {
//       newTask
//         .save()
//         .then((task) => console.log(task))
//         .catch((err) => console.log(err));
//     }
//     res.redirect("/projects");
//   });
// });

module.exports = router;
