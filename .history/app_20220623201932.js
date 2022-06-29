const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const morgon = require("morgan");

// imports

const connectDb = require("./db/connect");

const notFound = require("./middleware/not-found");

const errorHandleer = require("./middleware/error-handler");

//routers

const authRouters=require('./routes/authRoutes')

const userRouters=require('./routes/userRoutes')

const port = process.env.PORT || 5000;

//middleware
app.use(morgon("tiny"));
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use('/api/v1/auth',authRouters);
app.use('/api/v1/user',userRouters)




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
