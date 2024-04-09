const mongoose = require("mongoose");
const GlobalError = require("../errors/GlobalError");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Order must belong to a product"],
        },
        quantity: {
          type: Number,
          required: [true, "Order must have a quantity"],
        },
      },
    ],
    address: {
      type: String,
      required: [true, "Order must have an address"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["paypal", "stripe", "razorpay"],
      required: [true, "Order must have a payment method"],
      default: "paypal",
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },

    deliveredAt: {
      type: Date,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  });
  next();
});
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.product",
    select: "name price",
  });
  next();
});
orderSchema.virtual("totalPrice").get(function () {
  return this.products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
});

module.exports = mongoose.model("Order", orderSchema);
