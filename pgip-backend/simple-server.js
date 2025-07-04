const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "PGIP Backend is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    status: "healthy"
  });
});

// Test schemes endpoint
app.get("/api/schemes", (req, res) => {
  res.status(200).json({
    schemes: [
      {
        _id: "1",
        name: "PM Kisan Samman Nidhi",
        description: "Direct income support to farmers",
        category: "Agriculture",
        state: "All India",
        benefits: "₹6000 per year",
        eligibility: "Small and marginal farmers"
      },
      {
        _id: "2", 
        name: "Ayushman Bharat",
        description: "Health insurance for poor families",
        category: "Healthcare",
        state: "All India",
        benefits: "Up to ₹5 lakhs coverage",
        eligibility: "BPL families"
      }
    ]
  });
});

// Test auth endpoints
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  res.status(201).json({
    message: "User registered successfully",
    token: "test_token_123",
    profile: {
      _id: "user123",
      name: name,
      email: email,
      state: "Test State",
      city: "Test City"
    }
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  res.status(200).json({
    message: "Login successful",
    token: "test_token_123",
    profile: {
      _id: "user123",
      name: "Test User",
      email: email,
      state: "Test State",
      city: "Test City"
    }
  });
});

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  
  res.status(200).json({
    message: "Password reset email sent successfully"
  });
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "PGIP API Documentation",
    version: "1.0.0",
    status: "Test Mode - No Database",
    endpoints: {
      health: "GET /api/health",
      schemes: "GET /api/schemes", 
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        "forgot-password": "POST /api/auth/forgot-password"
      }
    }
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 PGIP Backend Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`⚠️  Running in TEST MODE - No Database`);
}); 