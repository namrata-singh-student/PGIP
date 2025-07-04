const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use environment variable or fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/pgip_db";
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log("Please ensure MongoDB is running or check your connection string");
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
