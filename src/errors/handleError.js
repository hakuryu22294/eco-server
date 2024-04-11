const { model } = require("mongoose");
const GlobalError = require("./GlobalError");

require("dotenv").config();

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new GlobalError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new GlobalError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  console.log(errors);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new GlobalError(message, 400);
};

const handleTokenExpiredError = () => {
  return new GlobalError("Your token has expired! Please log in again.", 401);
};
const handleTokenInvalidError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new GlobalError(message, 400);
};
const handleJWTError = () => {
  return new GlobalError("Invalid token. Please log in again.", 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  err.isOperational = true
    ? res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    : res.status(500).json({
        status: "Internal Server Error",
        message: "Something went very wrong!",
      });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError();
    if (err.name === "ValidationError") {
      handleValidationErrorDB(err);
    }
    sendErrorProd(err, res);
  }
};
