const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../errors/GlobalError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userSchema");

exports.checkLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies?.jwt;
  }
  if (!token) {
    return next(
      new GlobalError(
        "You are not logged in! Please log in to get access.",
        401
      )
    );
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new GlobalError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(
      new GlobalError(
        "User recently changed password! Please log in again.",
        401
      )
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.checkPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new GlobalError(
          "You do not have permission to perform this action.",
          403
        )
      );
    }
    next();
  };
};
