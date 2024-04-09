const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.COUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "eco",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
