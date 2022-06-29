const Review = require("../models/reviewModel");
const Product = require("../models/ProductModel");
const CustomError = require("../errors");

const { StatusCodes } = require("http-status-codes");
const { count } = require("../models/userModel");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  if (!productId) {
    throw new CustomError.BadRequestError("Please provide Product id");
  }

  //   const isValidProduct =await Product.findOne({_id:productId});

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      "Already sumbitted review for this product"
    );
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);

  if (!review) {
    throw new CustomError.BadRequestError(
      "Operation Failed please try again later"
    );
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Review Summited Sucessfully",
    review: review,
  });
};
const getAllReviews = async (req, res) => {
  const { productid } = req.body;

  if (!productid) {
    throw new CustomError.BadRequestError("Please provide Product id");
  }

  const reviews = await Review.findOne({});

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Reviews of product fetched Sucessfully",
    reviews: reviews,
  });
};
const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).json({
    sucesS: true,
  });
};
const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json({
    sucesS: true,
  });
};
const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).json({
    sucesS: true,
  });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
