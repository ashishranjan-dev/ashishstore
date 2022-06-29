const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
      minlength: 3,
      maxlegth: 50,
    },

    email: {
      type: String,
      unique:true,
      required: [true, "Provide Email"],
      validate: {
        validator: validator.isEmail,
        message: "Please Provide Valid Email",
      },
    },

    password: {
      type: String,
      required: [true, "Provide Password"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
  
);


UserSchema.pre('save',async function(){
  const salt=await bcrypt.genSalt(10);

  this.password=await bcrypt.hash(this.password,salt)

});

UserSchema.methods.comparePassword =async function(canditatePassword){
  const isMatch=await bcrypt.compare(canditatePassword,this.password);
  return isMatch;
}

UserSchema.methods.UpdatePassword =async function(canditatePassword){

  const salt=await bcrypt.genSalt(10);

  const newpassword =await bcrypt.hash(canditatePassword,salt)

  return newpassword;
}





module.exports = mongoose.model("Users", UserSchema);
