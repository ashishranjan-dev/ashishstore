const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

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

  const user = await User.findById({ id });

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
  res.status(StatusCodes.OK).send("update user");
};

const updatePassword = async (req, res) => {
  res.status(StatusCodes.OK).send("update Password");
};
module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updatePassword,
};
