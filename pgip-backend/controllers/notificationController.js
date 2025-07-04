const Notification = require("../models/Notification");
const User = require("../models/User");

// Get user notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    let query = { user: req.user.id };
    
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    const notifications = await Notification.find(query)
      .populate('relatedScheme', 'title category')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ 
      user: req.user.id, 
      isRead: false 
    });
    
    res.status(200).json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      unreadCount
    });
    
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    
    res.status(200).json({
      message: "Notification marked as read",
      notification
    });
    
  } catch (err) {
    console.error("Mark as read error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );
    
    res.status(200).json({
      message: "All notifications marked as read"
    });
    
  } catch (err) {
    console.error("Mark all as read error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    
    res.status(200).json({
      message: "Notification deleted successfully"
    });
    
  } catch (err) {
    console.error("Delete notification error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create notification (admin function)
exports.createNotification = async (req, res) => {
  try {
    const { userId, title, message, type, priority, relatedScheme, actionUrl } = req.body;
    
    const notification = new Notification({
      user: userId,
      title,
      message,
      type: type || 'general',
      priority: priority || 'medium',
      relatedScheme,
      actionUrl
    });
    
    await notification.save();
    
    res.status(201).json({
      message: "Notification created successfully",
      notification
    });
    
  } catch (err) {
    console.error("Create notification error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get notification statistics
exports.getNotificationStats = async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments({ user: req.user.id });
    const unreadNotifications = await Notification.countDocuments({ 
      user: req.user.id, 
      isRead: false 
    });
    const readNotifications = totalNotifications - unreadNotifications;
    
    // Notifications by type
    const typeStats = await Notification.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      total: totalNotifications,
      unread: unreadNotifications,
      read: readNotifications,
      typeStats
    });
    
  } catch (err) {
    console.error("Get notification stats error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get notifications by type (for public access)
exports.getNotificationsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    let query = { type, isPublic: true }; // Only public notifications
    
    const notifications = await Notification.find(query)
      .populate('relatedScheme', 'title category')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Notification.countDocuments(query);
    
    res.status(200).json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      type
    });
    
  } catch (err) {
    console.error("Get notifications by type error:", err);
    res.status(500).json({ error: "Server Error" });
  }
}; 