const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");
const CustomError = require("../errors");
const Product = require("../models/ProductModel");

const fakeStripeApi = async ({ amount, currency }) => {
  const client_secret = "SomeRandomvalue";
  return { client_secret, amount };
};

const getSingleUSerAllOrders = async (req, res) => {
  const id = req.user.userId;
  const order = await Order.find({
    user: id,
  });

  if (!order) {
    throw new CustomError.NotFoundError("No Product with id found ");
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    count: order.length,
    msg: "orders fetched sucessfully",
    orders: order,
  });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new CustomError.NotFoundError("No Product with id found ");
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "orders fetched sucessfully",
    orders: order,
  });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

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
    clientSecret: order.client_secret,
  });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId ,status,} = req.body;

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError("No Order found");
  }
  order.paymentIntent = paymentIntentId;
  order.status = "paid";

  await order.save()

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "order updated",
    order: order,
  });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getSingleUSerAllOrders,
  createOrder,
  updateOrder,
};
