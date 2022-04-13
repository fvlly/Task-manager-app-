const mongoose = require("mongoose");

const Task = mongoose.model("task", {
  description: {
    type: String,
    trim:true,
    required: true,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
