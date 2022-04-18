const User = require("../models/users");

// register a user , /users , access:public
const registerUser = async (req, res) => {
  const newUser = new User({
    name: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newUser.save();
    console.log("successfly logged new user");
    res.redirect("/dashboard");
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

// login a user , /users , access:public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser && User.password === password) {
      res.send(201).json({
        _id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });
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
    getUser
}
