const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const schemeRoutes = require("./routes/schemes");
const notificationRoutes = require("./routes/notifications");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets for frontends so root index links work
app.use("/frontend", express.static(path.join(__dirname, "..", "frontend")));
app.use("/frontend-react", express.static(path.join(__dirname, "..", "frontend-react")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "PGIP Backend is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "PGIP API Documentation",
    version: "1.0.0",
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register new user",
        "POST /api/auth/login": "User login",
        "POST /api/auth/forgot-password": "Request password reset",
        "POST /api/auth/reset-password": "Reset password",
        "GET /api/auth/profile": "Get user profile (protected)",
        "PUT /api/auth/profile": "Update user profile (protected)",
      },
      schemes: {
        "GET /api/schemes": "Get all schemes",
        "GET /api/schemes/search": "Search schemes",
        "GET /api/schemes/category/:category": "Get schemes by category",
        "GET /api/schemes/:id": "Get scheme by ID",
        "GET /api/schemes/personalized/recommendations":
          "Get personalized schemes (protected)",
        "POST /api/schemes": "Create new scheme (admin)",
        "PUT /api/schemes/:id": "Update scheme (admin)",
        "DELETE /api/schemes/:id": "Delete scheme (admin)",
      },
      notifications: {
        "GET /api/notifications": "Get user notifications (protected)",
        "GET /api/notifications/stats": "Get notification stats (protected)",
        "PUT /api/notifications/:id/read":
          "Mark notification as read (protected)",
        "PUT /api/notifications/read-all":
          "Mark all notifications as read (protected)",
        "DELETE /api/notifications/:id": "Delete notification (protected)",
        "POST /api/notifications": "Create notification (admin)",
      },
    },
  });
});

// Serve root-level index.html as the main entry
app.get("/", (req, res) => {
  const rootIndexPath = path.join(__dirname, "..", "index.html");
  res.sendFile(rootIndexPath);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 PGIP Backend Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
});
