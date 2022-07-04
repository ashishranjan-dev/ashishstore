const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");
const CustomError = require("../errors");
const getSingleUSerAllOrders = async (req, res) => {
  res.send("orders Route");
};
const getSingleOrder = async (req, res) => {
  res.send("orders Route");
};
const getAllOrders = async (req, res) => {
  res.send("orders Route");
};
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = eq.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }

  






  const order = await Order.create(req.body);

  if (!order) {
    throw new CustomError.BadRequestError(
      "Opeartion failed,please try again later"
    );
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Order Created Sucessfully",
    order: order,
  });
};
const updateOrder = async (req, res) => {
  res.send("orders Route");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getSingleUSerAllOrders,
  createOrder,
  updateOrder,
};
