const express = require("express");

const router = express.Router();

const {
  authenticationMiddleware,
  authorizedPermission,
} = require("../middleware/authentication");

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router
  .route("/createreview")
  .post(
    authenticationMiddleware,
    authorizedPermission("admin", "owner", "user"),
    createReview
  );

router
  .route("/getallreviews")
  .get(
    authenticationMiddleware,
    authorizedPermission("admin", "owner", "user"),
    getAllReviews
  );

router
  .route("/:id/getreview")
  .get(
    authenticationMiddleware,
    authorizedPermission("admin", "owner", "user"),
    getSingleReview
  );

router
  .route("/:id/updatereview")
  .patch(
    authenticationMiddleware,
    authorizedPermission("admin", "owner", "user"),
    updateReview
  );

router
  .route("/createreview")
  .delete(
    authenticationMiddleware,
    authorizedPermission("admin", "owner", "user"),
    deleteReview
  );


  module.exports= router
