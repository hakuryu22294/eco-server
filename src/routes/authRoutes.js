const { Router } = require("express");
const {
  register,
  forgotPassword,
  login,
  resetPassword,
  updatePassword,
  logout,
} = require("../controllers/authController");
const {
  getMe,
  updateMe,
  deleteMe,
  createUser,
  getAllUsers,
  getUser,
} = require("../controllers/userController");
const {
  checkLoggedIn,
  checkPermission,
} = require("../middlewares/checkPermission");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", checkLoggedIn, logout);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.patch("/resetPassword/:token", resetPassword);

authRouter.use(checkLoggedIn);
authRouter.patch("/updatePassword", updatePassword);
authRouter.get("/me", getMe);
authRouter.patch("/updateMe", updateMe);
authRouter.patch("/deleteMe", deleteMe);

authRouter.use(checkPermission("admin"));
authRouter.route("/").get(getAllUsers).post(createUser);
authRouter.route("/:id").get(getUser);

module.exports = authRouter;
