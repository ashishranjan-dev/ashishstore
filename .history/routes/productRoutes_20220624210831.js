const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizedPermission,
} = require("../middleware/authentication");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

router
  .route("/creteproduct")
  .post(
    authenticationMiddleware,
    authorizedPermission("admin", "owner"),
    createProduct
  );

router.route("/allproducts").get(authenticationMiddleware, getAllProducts);

router
  .route("/:id/singleproduct")
  .post(authenticationMiddleware, getSingleProduct);

router
  .route("/:id/updateproduct")
  .patch(
    authenticationMiddleware,
    authorizedPermission("admin", "owner"),
    updateProduct
  );

router
  .route("/:id/deleteproduct")
  .delete(
    authenticationMiddleware,
    authorizedPermission("admin", "owner"),
    deleteProduct
  );

router
  .route("/creteproduct")
  .post(authenticationMiddleware, authorizedPermission, createProduct);

router
  .route("/uploadimage")
  .post(authenticationMiddleware, authorizedPermission, uploadImage);

  module.exports=router
