const Category = require("../models/categorySchema");
const handleController = require("./handleController");
const GlobalError = require("../errors/GlobalError");
const catchAsync = require("../utils/catchAsync");

exports.createCategory = catchAsync(async (req, res, next) => {
  const file = req.file.path;
  const category = await Category.create({
    ...req.body,
    user: req.user._id,
    image: file,
  });
  res.status(201).json({
    status: "success",
    data: {
      data: category,
    },
  });
});
exports.getAllCategories = handleController.getAll(Category);
exports.getCategory = handleController.getOne(Category);
exports.updateCategory = handleController.updateOne(Category);
exports.deleteCategory = handleController.deleteOne(Category);
