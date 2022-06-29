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

  const reviews = await Review.find({}).populate({
    path:'product',
    select:"company name"
  }
  ).exec();

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Reviews of product fetched Sucessfully",
    count: reviews.length,
    reviews: reviews,
  });
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Review fetched Sucessfully",
    review: review,
  });
};
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const { rating, title, comment } = req.body;

  if (!rating || !title || !comment) {
    throw new CustomError.BadRequestError("Please Provide all values");
  }

  const review = await Review.findById(reviewId);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Review updated Sucessfully",
    review: review,
  });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  review.delete();

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Review deleted Sucessfully",
  });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
