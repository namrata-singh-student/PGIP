const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  getNotificationStats,
  getNotificationsByType
} = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route for getting notifications by type (must be BEFORE auth middleware)
router.get("/type/:type", getNotificationsByType);

// All other notification routes require authentication
router.use(authMiddleware);

// User notification routes
router.get("/", getUserNotifications);
router.get("/stats", getNotificationStats);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

// Admin route (you can add admin middleware later)
router.post("/", createNotification);

module.exports = router; 