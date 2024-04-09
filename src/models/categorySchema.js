const mongoose = require("mongoose");
const GlobalError = require("../errors/GlobalError");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      default: "all",
      unique: true,
      trim: true,
      maxlength: [40, "Name cannot be more than 40 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "no-photo.jpg",
      required: [true, "Please provide an image"],
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

categorySchema.pre(/^findByIdAndDelete/, async function (next) {
  this.products.length > 0
    ? next(new GlobalError("Category has Products, cannot be deleted!", 400))
    : next();
});

module.exports = mongoose.model("Category", categorySchema);
