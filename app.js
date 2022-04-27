const express = require("express");
require("./db/mongoose");
const ejs = require("ejs");
require("dotenv").config();

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// // middleware for maintenance
// app.use((req, res, next) => {
//   // const {get,post,put,patch,delete,} = req.method

//   res.status(503).send("Site undergoing maintenance");
// });

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("App is up and running on " + port);
});
