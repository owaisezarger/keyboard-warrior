//importing necessary modules

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
require("dotenv").config();
const userRouter = express.Router();

//defining routes
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// userRouter.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     bcrypt.hash(password, 5, async (err, hash) => {
//       if (err) res.send({ msg: "Something went wrong", error: err.message });
//       else {
//         const user = new UserModel({
//           name,
//           email,
//           password: hash,
//         });
//         await user.save();
//         res.send({ msg: "New Users has been register" });
//       }
//     });
//   } catch (err) {
//     res.send({ msg: "Something went wrong", error: err.message });
//   }
// });

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let isExist = await UserModel.find({ email });
    if (isExist.length > 0) {
      res.send("User already exist, please login");
    } else {
      bcrypt.hash(password, 5, async function (err, secure_password) {
        if (err) {
          res.send({ err: err });
        } else {
          const user = new UserModel({
            name,
            email,
            password: secure_password,
          });
          await user.save();
          res.send({ msg: "User registered Successfully" });
        }
      });
    }
  } catch (error) {
    res.send({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, process.env.userkey);
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

// DELETE a user by ID
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = { userRouter };
