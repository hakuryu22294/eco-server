const mongoose = require("mongoose");
const GlobalError = require("../errors/GlobalError");
const Color = require("../models/colorSchema");
const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");

exports.deleteColor = catchAsync(async (req, res, next) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    return next(new GlobalError("No color found with that ID", 404));
  }
  await color.remove();
});

exports.createColor = handleController.createOne(Color);
exports.getAllColors = handleController.getAll(Color);
exports.getColor = handleController.getOne(Color);
exports.updateColor = handleController.updateOne(Color);
