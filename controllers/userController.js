const bcrypt = require("bcryptjs");
const User = require("../models/users");

// register a user , /users , access:public
const registerUser = async (req, res) => {
  const { fullName: name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please input all fields");
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    console.log("user saved to db");
    res.status(201).json(newUser);
    // res.redirect("/dashboard");
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

// login a user , /users , access:public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (foundUser && isMatch) {
      res.status(201).json(foundUser);
    } else {
      console.log("invalid credentials");
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("invalid user details");
  }
};

// get a user,/user/:id, private

const getUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findOne({ _id });
    if (user) {
      res.send(201).json({
        _id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("invalid user details");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
