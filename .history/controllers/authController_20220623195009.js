const User = require("../models/userModel");

const { StatusCodes } = require("http-status-codes");

const CustomError = require("../errors");

const { createJWT } = require("../utils/index");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please Provide email");
  }

  if (!password) {
    throw new CustomError.BadRequestError("Please Provide Passowrd");
  }

  if (!name) {
    throw new CustomError.BadRequestError("Please Provide Name");
  }

  const newUser = await User.findOne({ email });

  if (newUser) {
    throw new CustomError.BadRequestError("Email ALready Exist");
  }

  const noOfUsers = await User.countDocuments({});

  const role = noOfUsers === 0 ? "admin" : "user";

  const user = new User({
    name,
    password,
    email,
    role,
  });

  await user.save();

  // User.create({}) can also we used

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "User Created Sucessfully",
    token: token,
    user: tokenUser,
  });
};

const login = async (req, res) => {

    const { name ,password}=req.body

  if (!password) {
    throw new CustomError.BadRequestError("Please Provide Passowrd");
  }

  if (!name) {
    throw new CustomError.BadRequestError("Please Provide Name");
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "User Created Sucessfully",
    token: token,
    user: tokenUser,
  });




  
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
