const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const GlobalError = require("./errors/GlobalError");
const handleError = require("./errors/handleError");
const router = require("./routes");
const helmet = require("helmet");
const xss = require("xss-clean");
const sanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();

app.use(helmet());
app.use(xss());
app.use(sanitize());
app.use(
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  })
);
app.use(compression());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));
connectDB();
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});
app.use("/api/v1", router);
app.all("*", (req, res, next) => {
  next(new GlobalError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(handleError);

module.exports = app;
