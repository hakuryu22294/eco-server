const Review = require("../models/reviewSchema");
const handleController = require("./handleController");

exports.setProductUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.prodId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = handleController.getAll(Review);
exports.getReview = handleController.getOne(Review);
exports.createReview = handleController.createOne(Review);
exports.updateReview = handleController.updateOne(Review);
exports.deleteReview = handleController.deleteOne(Review);
