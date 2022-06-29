const mongoose = require("mongoose");
const validator =require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide Name"],
    minlength: 3,
    maxlegth: 50,
  },

  email: {
    type: String,
    required: [true, "Provide Email"],
    validate:{
        validator:validator.isEmail,
        message:'Please Provide Email'
    }
  },

  password: {
    type: String,
    required: [true, "Provide Password"],
    minlength: 6,
  },
  
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
},




},{timestamps:true}
);


module.exports =mongoose.model('Users',UserSchema)



