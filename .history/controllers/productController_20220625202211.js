const Product = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    company,
    colors,
    inventory,
    user,
  } = req.body;

  const product = await Product.create(req.body);

  if (!product) {
    throw new CustomError.BadRequestError(
      "Operation Failed please try again later"
    );
  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Product created Sucessfully",
    product: product,
  });
};

// get all products

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Products Fetched Sucessfully",
    count: products.length,
    products: products,
  });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    throw new CustomError.BadRequestError("Please Provide id");
  }

  const product = await Product.findOne({ _id: productId });

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Product Fetched Sucessfully",
    product: product,
  });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    throw new CustomError.BadRequestError("Please Provide id");
  }

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Product Updated  Sucessfully",
    product: product,
  });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    throw new CustomError.BadRequestError("Please Provide id");
  }

  const product = await Product.findByIdAndDelete(productId);

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Product Has been deleted Sucessfully",
  });
  //
};
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("Please Provide image");
  }

  const productImage =req.files.image;

  if(!productImage.mimetype.startsWith('image')){

    throw new CustomError.BadRequestError("Please Provide image");

  }

  res.status(StatusCodes.OK).json({
    sucess: true,
    msg: "Image Has been uploaded Sucessfully",
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
