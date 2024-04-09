const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  checkLoggedIn,
  checkPermission,
} = require("../middlewares/checkPermission");
const reviewRouter = require("./reviewRoutes");
const upload = require("../config/upload");

const productRouter = Router();

productRouter.use("/:prodId/reviews", reviewRouter);

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);

productRouter.use(checkLoggedIn, checkPermission("admin", "shop-manager"));
productRouter.post("/", upload.array("files"), createProduct);
productRouter.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = productRouter;
