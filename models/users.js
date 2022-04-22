const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // required for virtuals to work
const Task = require("../models/tasks");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "password length much b longr than 8"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// User/Task relationship

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

//cascade delete user and along with tasks

userSchema.pre("remove", async function(next){
  const user = this;
  await Task.deleteMany({owner:user._id})
  next()
})

module.exports = User;
