const { Router } = require("express");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  checkPermission,
  checkLoggedIn,
} = require("../middlewares/checkPermission");
const upload = require("../config/upload");
const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.use(checkLoggedIn, checkPermission("admin", "shop-manager"));
categoryRouter.post("/", upload.single("file"), createCategory);
categoryRouter.route("/:id").patch(updateCategory).delete(deleteCategory);

module.exports = categoryRouter;
