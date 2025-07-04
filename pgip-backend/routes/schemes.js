const express = require("express");
const router = express.Router();
const {
  getAllSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  getPersonalizedSchemes,
  getSchemesByCategory,
  searchSchemes
} = require("../controllers/schemeController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllSchemes);
router.get("/search", searchSchemes);
router.get("/category/:category", getSchemesByCategory);
router.get("/:id", getSchemeById);

// Protected routes
router.get("/personalized/recommendations", authMiddleware, getPersonalizedSchemes);

// Admin routes (you can add admin middleware later)
router.post("/", createScheme);
router.put("/:id", updateScheme);
router.delete("/:id", deleteScheme);

module.exports = router; 