const mongoose = require("mongoose");
const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Color name is required"],
      unique: true,
    },
    hex: {
      type: String,
      required: [true, "Color hex is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
