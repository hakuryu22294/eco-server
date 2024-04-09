const { Router } = require("express");
const {
  createOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  updateOrder,
} = require("../controllers/orderController");

const {
  checkLoggedIn,
  checkPermission,
} = require("../middlewares/checkPermission");

const orderRouter = Router();
orderRouter.use(checkLoggedIn);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.use(checkLoggedIn, checkPermission("admin", "user"));
orderRouter.post("/", createOrder);
orderRouter.patch("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
