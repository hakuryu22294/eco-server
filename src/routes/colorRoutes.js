const { Router } = require("express");
const {
  getAllColors,
  getColor,
  createColor,
  updateColor,
  deleteColor,
} = require("../controllers/colorController");

const {
  checkLoggedIn,
  checkPermission,
} = require("../middlewares/checkPermission");

const colorRouter = Router();

colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getColor);
colorRouter.use(checkLoggedIn, checkPermission("admin"));
colorRouter.post("/", createColor);
colorRouter.patch("/:id", updateColor);
colorRouter.delete("/:id", deleteColor);

module.exports = colorRouter;
