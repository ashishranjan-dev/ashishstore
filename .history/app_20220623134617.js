const express = require("express");
const app = express();
const dotenv=require('dotenv').config()

// imports

const connectDb=require('./db/connect')

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb()
    app.listen(port, () => {
      console.log(`server started at port ${port}`);

      
    });
  } catch (error) {

    console.log(`error occured ${error}`);


  }
};

start()
