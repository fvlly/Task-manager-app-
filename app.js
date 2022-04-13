const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

require("./db/mongoose");
const User = require("./models/users");
const Task = require("./models/tasks");

const app = express();
app.use(express.static("public"));

// app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      console.log(newUser);
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.log("Error", error);
    });
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/projects", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.render("projects", { taskItems: tasks });
    })
    .catch((err) => {
      res.status(400).send("no tasks in collection");
    });
});

app.post("/taskCard", (req, res) => {
 const buttonName = req.body.taskbutton;
 console.log(buttonName, 'clicked');
  const newTask = new Task({
    description: _.lowerCase(req.body.taskTitle),
  });

  Task.findOne({ description: newTask.description }, (err, task) => {
    if (!err) {
      if (!task) {
        newTask
          .save()
          .then((task) => {
            console.log(task);
          })
          .catch((err) => {
            res.status(400).send(err);
          });

        res.redirect("/projects");
      } else {
        console.log("task already exists");
        res.redirect("/projects");
        return;
      }
    }
  });
});

app.listen(3000, () => {
  console.log("App is up and running!!!");
});
