const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      trim: true,
      maxlength: [40, "Name cannot be more than 40 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be less than 0"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      ref: "Category",
    },
    sizes: {
      type: [String],
      required: [true, "Please provide a size"],
    },
    brand: {
      type: String,
      required: [true, "Please provide a brand"],
      ref: "Brand",
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    images: [
      {
        type: String,
        default: "no-photo.jpg",
      },
    ],
    colors: {
      type: [String],
      required: [true, "Please provide a color"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Please provide a stock"],
      default: 100,
      min: [0, "Stock cannot be less than 0"],
    },
    totalSold: {
      type: Number,
      default: 0,
      required: [true, "Please provide a total sold"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.virtual("averageRating").get(function () {
  const ratings = this.reviews?.map((el) => el.rating);
  const totalRating = ratings?.reduce((acc, cur) => acc + cur, 0);
  return totalRating / ratings?.length;
});
productSchema.virtual("totalReviews").get(function () {
  return this.reviews?.length || 0;
});

module.exports = mongoose.model("Product", productSchema);
