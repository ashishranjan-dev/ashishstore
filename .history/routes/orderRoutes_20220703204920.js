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
  updatePaymentOrder
} = require("../controllers/order_controller");

router
  .route("/getallorders")
  .get(authenticationMiddleware, authorizedPermission('admin','owner'), getAllOrders);

router
  .route("/:id/getsingleorder")
  .get(authenticationMiddleware, getSingleOrder);

router
  .route("/getSingleUserAllOrders")
  .get(authenticationMiddleware, getSingleUSerAllOrders);

router.route("/createorder").post(authenticationMiddleware, createOrder);

router
  .patch(authenticationMiddleware, updatePaymentOrder);


  router
  .route("/:id/updateorder")
  .patch(authenticationMiddleware,  authorizedPermission('admin','owner'), updateOrder);

  module.exports =router
