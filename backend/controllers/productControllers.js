const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const arr = req.body;
  const products = [];
  arr.forEach(async (a) => {
    const product = await Product.create(a);
    products.push(product);
  });

  res.status(200).json({
    success: true,
    products,
  });
});

//------------- getAll Products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const productCount = await Product.countDocuments();

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
//----------------get Single Product

exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  let product = await Product.find({
    productId: productId,
  });

  if (!product || product?.length === 0) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
