
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true,"password length much b longr than 8"]
  },
},{timestamps:true})

const User = mongoose.model("User",userSchema);

 module.exports = User