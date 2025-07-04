const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: "No token provided, authorization denied" 
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({ 
        error: "No token provided, authorization denied" 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        error: "User no longer exists" 
      });
    }

    // Add user to request object
    req.user = decoded;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: "Invalid token" 
      });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: "Token expired" 
      });
    }
    
    res.status(500).json({ 
      error: "Server error in authentication" 
    });
  }
};

module.exports = authMiddleware;
