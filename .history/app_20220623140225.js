const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const morgon = require("morgan");

// imports

const connectDb = require("./db/connect");

const notFound = require("./middleware/not-found");

const errorHandleer = require("./middleware/error-handler");

const port = process.env.PORT || 5000;

//middleware
app.use(morgon("tiny"));
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

//errpr handler middlewares
app.use(notFound);
app.use(errorHandleer);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server started at port ${port}`);
    });
  } catch (error) {
    console.log(`error occured ${error}`);
  }
};

start();
