const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const tasks = []

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signin",(req,res)=>{
    res.render("signin")
})
app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})
app.get("/projects",(req,res)=>{
    res.render("projects", {newTask:tasks})

    })


app.post("/taskCard",(req,res)=> {
    const newTask = {
        taskHeader:req.body.tasktitle,
        taskContent:req.body.taskcontent,
    }

    console.log(newTask);

    tasks.push(newTask)

    res.redirect("/projects")
})


app.listen(3000, () => {
  console.log("App is up and running!!!");
});
