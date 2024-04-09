const { Router } = require("express");
const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  setProductUserIds,
} = require("../controllers/reviewController");

const {
  checkLoggedIn,
  checkPermission,
} = require("../middlewares/checkPermission");

const reviewRouter = Router({ mergeParams: true });

reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReview);
reviewRouter.use(checkLoggedIn, checkPermission("user"));
reviewRouter.post("/", setProductUserIds, createReview);
reviewRouter.use(checkLoggedIn, checkPermission("admin", "user"));
reviewRouter.patch("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

module.exports = reviewRouter;
