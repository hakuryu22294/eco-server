const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const uri = process.env.MONGO_URI.replace(
  "<password>",
  process.env.DB_PASSWORD
);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
