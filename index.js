//Importing the necessary modules

const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
require("dotenv").config();

//Creating the Express app
const app = express();

app.use(express.json());
app.use(cors());

//defining routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);

//Starting the server

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(" Cannot Connected to DB");
    console.log(error);
  }
  console.log(`Running the server at ${process.env.port}`);
});
