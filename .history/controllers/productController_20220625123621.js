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

    const products=await Product.find()

};

const getSingleProduct = async (req, res) => {
  res.send("create product");
};

const updateProduct = async (req, res) => {
  res.send("create product");
};

const deleteProduct = async (req, res) => {
  res.send("create product");
};
const uploadImage = async (req, res) => {
  res.send("create product");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
