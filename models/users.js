
const mongoose = require('mongoose')

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

  module.exports = User