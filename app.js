const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const morgon = require("morgan");


// imports

const connectDb = require("./db/connect");

const notFound = require("./middleware/not-found");

const errorHandleer = require("./middleware/error-handler");

const fileUpload=require('express-fileupload')

//routers

const authRouters=require('./routes/authRoutes')

const userRouters=require('./routes/userRoutes')

const productRouters=require('./routes/productRoutes')

const ReviewRouters =require('./routes/reviewRoutes')

const port = process.env.PORT || 5000;

//middleware
app.use(morgon("tiny"));
app.use(express.json());

app.use(express.static('./public'))
app.use(fileUpload())


//routes

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use('/api/v1/auth',authRouters);
app.use('/api/v1/user',userRouters);
app.use('/api/v1/product',productRouters);
app.use('/api/v1/review',ReviewRouters)




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
