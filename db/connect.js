const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url).then(()=>{
    console.log('database has been Connected')
  }).catch((error)=>{
    console.log(error)

  })
};

module.exports = connectDB;
