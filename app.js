const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/taskManagerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,
});

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
});

const Task = mongoose.Model("task",{
    description:{
        type:String,
        require:true,
    },
    taskState:{
        type:String,
        required:true,
        default:"not start",
    }
})

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const tasks = [];

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
  res.render("projects", { newTask: tasks });
});

app.post("/taskCard", (req, res) => {
  const newTask = {
    taskHeader: req.body.tasktitle,
    taskContent: req.body.taskcontent,
  };

  console.log(newTask);

  tasks.push(newTask);

  res.redirect("/projects");
});

app.listen(3000, () => {
  console.log("App is up and running!!!");
});
