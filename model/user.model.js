//Importing the necessary modules

const mongoose = require("mongoose");

//creating a schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };
