const mongoose = require("mongoose");
const GlobalError = require("../errors/GlobalError");
const Brand = require("../models/brandSchema");
const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");

exports.deleteBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return next(new GlobalError("No brand found with that ID", 404));
  }
  await brand.remove();
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    status: "success",
    data: {
      data: brand,
    },
  });
});
exports.getAllBrands = handleController.getAll(Brand);
exports.getBrand = handleController.getOne(Brand);
exports.updateBrand = handleController.updateOne(Brand);
