const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");
const CustomError = require("../errors");
const Product = require("../models/ProductModel");

const fakeStripeApi = async ({ amount, currency }) => {
  const client_secret = "SomeRandomvalue";
  return { client_secret, amount };
};

const getSingleUSerAllOrders = async (req, res) => {
  res.send("orders Route");
};
const getSingleOrder = async (req, res) => {
  res.send("orders Route");
};
const getAllOrders = async (req, res) => {

    const orders=await orders.find({})

    res.status(StatusCodes.OK).json({
        sucess: true,
        msg: "orders fetched sucessfully",
        orders: orders,
  
      });

};
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }

  let orderItems = [];

  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new CustomError.NotFoundError("No Product with id found ");
    }

    const { name, price, image, _id } = dbProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    orderItems = [...orderItems, singleOrderItem];

    subtotal += item.amount * price;
  }

  const total = tax + shippingFee + subtotal;

  //payment

  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  if (!order) {
    throw new CustomError.BadRequestError(
      "Opeartion failed,please try again later"
    );
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "token created",
    order: order,
    clientSecret:order.client_secret

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
