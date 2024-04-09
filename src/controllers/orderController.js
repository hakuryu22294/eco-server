const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { products } = req.body;
  const ordersItems = await Product.find({
    _id: { $in: products.map((p) => p.product) },
  });

  const orderProducts = [];

  for (let order of products) {
    const product = ordersItems.find(
      (product) => product._id.toString() === order.product
    );
    if (product) {
      product.totalSold += order.quantity;
      product.stock -= order.quantity;
      await product.save();
      orderProducts.push({
        product: product._id,
        quantity: order.quantity,
        price: product.price,
      });
    }
  }

  const order = await Order.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    status: "success",
    order,
  });
});

exports.getAllOrders = handleController.getAll(Order);
exports.getOrder = handleController.getOne(Order);
exports.updateOrder = handleController.updateOne(Order);
exports.deleteOrder = handleController.deleteOne(Order);
