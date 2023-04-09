//Importing the necessary modules

const mongoose = require("mongoose");
require("dotenv").config();

//Using a database

const connection = mongoose.connect(process.env.mongoURL);

module.exports = { connection };
