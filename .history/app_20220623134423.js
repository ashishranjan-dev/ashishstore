const express = require("express");
const app = express();
const dotenv=require('dotenv').config()

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server started at port ${port}`);
      
    });
  } catch (error) {

    console.log(`error occured ${error}`);


  }
};

start()
