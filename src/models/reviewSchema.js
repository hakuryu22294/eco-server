const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
      maxlength: [200, "Message cannot be more than 200 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating cannot be less than 1"],
      max: [5, "Rating cannot be more than 5"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name avatar",
  });
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
