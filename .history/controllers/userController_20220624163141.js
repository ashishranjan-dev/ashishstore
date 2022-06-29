const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {createJWT}=require('../utils/index')


const getAllUsers = async (req, res) => {
  const data = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Data fetched Sucessfully",
    data: data,
  });
};

const getSingleUser = async (req, res) => {
  const id = req.user.userId;

  const user = await User.findById(id)

  if (!user) {
    throw new CustomError.BadRequestError("No user data found");
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Data fetched Sucessfully",
    data: user,
  });
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).send("get current User");
};

const updateUser = async (req, res) => {
  const id = req.user.userId;
  const { name } = req.body;
  if (!name) {
    throw new CustomError.BadRequestError("Please Provide Name");
  }

  const user=await User.findOneAndUpdate({_id:id},{name},{new:true,runValidators:true})


  

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "User upadated",
  });
};

//

const changePassword = async (req, res) => {

  const id = req.user.userId;

  console.log(`id is${id}`)

  const { oldpassword, newpassword, confirmpassword } = req.body;

  if (!oldpassword) {
    throw new CustomError.BadRequestError("Please Provide Old Password");
  }

  if (!newpassword) {
    throw new CustomError.BadRequestError("Please Provide new Password");
  }

  if (!confirmpassword) {
    throw new CustomError.BadRequestError("Please Provide Confirm Password");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError.BadRequestError(
      "Np user Found,please Try again Later"
    );
  }

  const valdPassword = await user.comparePassword(oldpassword);

  if (!valdPassword) {
    throw new CustomError.BadRequestError("Invalid password");
  }

  const match = confirmpassword === newpassword;

  if (!match) {
    throw new CustomError.BadRequestError(
      "New Password and Confirm Password dosen't Match"
    );
  }
  user.password = updatedPassword;

  await user.save();

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Password Has been updated",
  });
};
module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  changePassword,
};
