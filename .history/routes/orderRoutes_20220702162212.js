const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizedPermission,
} = require("../middleware/authentication");

const {
  getAllOrders,
  getSingleOrder,
  getSingleUSerAllOrders,
  createOrder,
  updateOrder,
} = require("../controllers/order_controller");

router
  .route("/getallorders")
  .get(authenticationMiddleware, authorizedPermission, getAllOrders);

router
  .route("/:id/getSingleorder")
  .get(authenticationMiddleware, getSingleOrder);

router
  .route("/getSingleUserAllOrders")
  .get(authenticationMiddleware, getSingleUSerAllOrders);

router.route("/createorder").post(authenticationMiddleware, createOrder);

router
  .route("/updateorder")
  .patch(authenticationMiddleware, authorizedPermission, updateOrder);

  module.exports =router
