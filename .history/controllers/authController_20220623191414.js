const User = require("../models/userModel");

const { StatusCodes } = require("http-status-codes");

const CustomError = require("../errors");
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
  const { email, password, name } = req.body;


  const newUser=await User.findOne({email});

  if(newUser){
    throw new CustomError.BadRequestError('Email ALready Exist')

  }

const noOfUsers =await User.countDocuments({})

const role = noOfUsers === 0?'admin':'user'




  const user = new User({
    name,
    password,
    email,
    role
  });

  await user.save();

  // User.create({}) can also we used

  const tokenUser={name:user.name,userId:user._id,role:user.role}

  const token=jwt.sign(tokenUser,process.env.JWT_SECRET,{expiresIn:'1d'});





  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "User Created Sucessfully",
    token:token,
    user:tokenUser

  });
};

const login = async (req, res) => {
  res.send("login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
