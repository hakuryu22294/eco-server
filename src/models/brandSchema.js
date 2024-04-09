const mongoose = require("mongoose");
const GlobalError = require("../errors/GlobalError");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      default: "No-Brand",
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

brandSchema.pre("remove", async function (next) {
  this.products.length > 0
    ? next(new GlobalError("Brand has Products, cannot be deleted!", 400))
    : next();
});

module.exports = mongoose.model("Brand", brandSchema);
