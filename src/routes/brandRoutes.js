const { Router } = require("express");
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const {
  checkLoggedIn,
  checkPermission,
} = require("../middlewares/checkPermission");

const brandRouter = Router();

brandRouter.get("/", getAllBrands);
brandRouter.get("/:id", getBrand);
brandRouter.use(checkLoggedIn, checkPermission("admin"));
brandRouter.post("/", createBrand);
brandRouter.patch("/:id", updateBrand);
brandRouter.delete("/:id", deleteBrand);

module.exports = brandRouter;
