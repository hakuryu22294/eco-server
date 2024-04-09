const { Router } = require("express");

const authRouter = require("./authRoutes");
const productRouter = require("./productRoutes");
const categoryRouter = require("./categoryRoutes");
const brandRouter = require("./brandRoutes");
const colorRouter = require("./colorRoutes");
const reviewRouter = require("./reviewRoutes");
const orderRouter = require("./orderRoutes");

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/colors", colorRouter);
router.use("/reviews", reviewRouter);
router.use("/orders", orderRouter);

module.exports = router;
