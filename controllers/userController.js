const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sharp = require("sharp/lib/sharp");
const User = require("../models/users");

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// register a user , /register , access:public
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
    const token = generateToken(newUser.id);
    res.status(201).send({ newUser, token });
    // res.redirect("/dashboard");
  } catch (error) {
    res.status(404).send(e.message);
    throw new Error("no connection to database retur later");
  }
};

// login a user , /login , access:public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (foundUser && isMatch) {
      const token = generateToken(foundUser.id);

      res.status(200).send({ foundUser, token });
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
  res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    throw new Error("no user");
    res.status(500).send();
  }
};

// upload avatar /users/upload @access private
const postAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({
      width: 250,
      height: 250,
    })
    .png()
    .toBuffer();
  req.user.avatar = buffer;

  await req.user.save();
  res.send({ file: "successfully uploaded avatar" });
};

//get user avatar, /users/:id/avatar @access private
const getAvatar =async (req,res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
        throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
} catch (e) {
    res.status(404).send()
}



}

// delete user avatar, /users/me/avatar, @access private
const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
}


module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  postAvatar,
  getAvatar,
  deleteAvatar,
};
