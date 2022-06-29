const express = require("express");
const app = express();
const dotenv=require('dotenv').config()

// imports

const connectDb=require('./db/connect')

const  notFound=require('./middleware/not-found')

const  errorHandleer=require('./middleware/error-handler')

const port = process.env.PORT || 5000;


//routes

app.get('/',(req,res)=>{
  res.send('e-commerce api')
})





//middleware

app.use(express.json())

//errpr handler middlewares
app.use(notFound)
app.use(errorHandleer)




const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`server started at port ${port}`);

      
    });
  } catch (error) {

    console.log(`error occured ${error}`);


  }
};

start()
