const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
console.log("Connecting to MongoDB...");
console.log("Using MONGO_URI:", process.env.MONGO_URI);
const connectDB = async () => {
  try {
    // Use environment variable or fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log(
      "Please ensure MongoDB is running or check your connection string"
    );
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
