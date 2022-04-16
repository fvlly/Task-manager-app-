const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");
const ejs = require("ejs");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("App is up and running on" + port);
});
