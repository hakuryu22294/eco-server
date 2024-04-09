const Product = require("../models/productSchema");
const handleController = require("./handleController");
const GlobalError = require("../errors/GlobalError");
const catchAsync = require("../utils/catchAsync");
const Category = require("../models/categorySchema");
const Brand = require("../models/brandSchema");
const Color = require("../models/colorSchema");

exports.createProduct = catchAsync(async (req, res, next) => {
  const convertedImgs = req.files?.map((file) => file.path);
  const { category, brand, colors } = req.body;
  const cateFound = await Category.findOne({ name: category });
  if (!cateFound) {
    return next(new GlobalError("Category not found", 404));
  }
  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) {
    return next(new GlobalError("Brand not found", 404));
  }
  const colorsFound = await Color.find({ name: { $in: colors } });
  if (colorsFound.length !== colors.length) {
    return next(new GlobalError("Color not found", 404));
  }
  const product = await Product.create({
    ...req.body,
    user: req.user._id,
    images: convertedImgs,
  });
  cateFound.products.push(product._id);
  await cateFound.save();
  brandFound.products.push(product._id);
  await brandFound.save();
  res.status(201).json({
    status: "success",
    data: {
      data: product,
    },
  });
});

exports.getAllProducts = handleController.getAll(Product);
exports.getProduct = handleController.getOne(Product, { path: "reviews" });
exports.updateProduct = handleController.updateOne(Product);
exports.deleteProduct = handleController.deleteOne(Product);
