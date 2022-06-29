const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createJWT } = require("../utils/index");

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

  const user = await User.findById(id);

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

  const user = await User.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "User upadated",
    token: token,
    user: tokenUser,
  });
};

//

const changePassword = async (req, res) => {
  const id = req.user.userId;

  console.log(`id is${id}`);

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
  user.password = newpassword;

  await user.save();

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Password Has been updated",
  });
};

// change role
// admin and owmner can only change roles
//admin can make anybody an admin but an owner
//owner are allowed to change thier as well as other roles
// admin can also change ther role to user
// first register user which is a owner cannot make himself an admin or user

const changeRoles = async (req, res) => {
  const { id, role } = req.user.userId;

  const { userid, newrole } = req.body;

  if (!userid) {
    throw new CustomError.BadRequestError("Please provide user id");
  }

  if (!newrole) {
    throw new CustomError.BadRequestError("Please provide new role");
  }
  console.log(newrole);

  if (!["admin", "user", "owner"].includes(newrole)) {
    throw new CustomError.BadRequestError("Invalid new role");
  }

  const user = await User.findOne({ _id: userid });

  if (!user) {
    throw new CustomError.BadRequestError("No user found with that id");
  }

  if (role === "admin") {
    if (newrole === "admin" || newrole === "user") {
      user.role = newrole;

      await user.save();
    } else {
      new CustomError.UnauthorizedError("Operation Not allowed");
    }
  } else if (role === "owner") {
    user.role = newrole;

    await data.save();
  } else {
    new CustomError.BadRequestError("Operation Failed Try again Later");
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: 'User role changed sucessfully',
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  changePassword,
  changeRoles,
};
