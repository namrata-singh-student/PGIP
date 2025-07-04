const Scheme = require("../models/Scheme");
const User = require("../models/User");

// Get all schemes
exports.getAllSchemes = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const schemes = await Scheme.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Scheme.countDocuments(query);
    
    res.status(200).json({
      schemes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
    
  } catch (err) {
    console.error("Get schemes error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get scheme by ID
exports.getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    
    res.status(200).json({ scheme });
    
  } catch (err) {
    console.error("Get scheme error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create new scheme
exports.createScheme = async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    
    res.status(201).json({
      message: "Scheme created successfully",
      scheme
    });
    
  } catch (err) {
    console.error("Create scheme error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update scheme
exports.updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    
    res.status(200).json({
      message: "Scheme updated successfully",
      scheme
    });
    
  } catch (err) {
    console.error("Update scheme error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete scheme
exports.deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    
    res.status(200).json({
      message: "Scheme deleted successfully"
    });
    
  } catch (err) {
    console.error("Delete scheme error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get personalized schemes for user
exports.getPersonalizedSchemes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    let query = { status: 'active' };
    
    // Filter by age
    if (user.age) {
      query['eligibility.age.min'] = { $lte: user.age };
      query['eligibility.age.max'] = { $gte: user.age };
    }
    
    // Filter by occupation
    if (user.occupation && user.occupation !== '') {
      query['eligibility.occupation'] = { $in: [user.occupation, 'all'] };
    }
    
    // Filter by state
    if (user.state) {
      query['eligibility.states'] = { $in: [user.state, 'all'] };
    }
    
    const schemes = await Scheme.find(query)
      .limit(10)
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      schemes,
      userProfile: user.getProfile()
    });
    
  } catch (err) {
    console.error("Get personalized schemes error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get schemes by category
exports.getSchemesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const schemes = await Scheme.find({ 
      category, 
      status: 'active' 
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Scheme.countDocuments({ category, status: 'active' });
    
    res.status(200).json({
      schemes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      category
    });
    
  } catch (err) {
    console.error("Get schemes by category error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Search schemes
exports.searchSchemes = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }
    
    const query = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ],
      status: 'active'
    };
    
    const schemes = await Scheme.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Scheme.countDocuments(query);
    
    res.status(200).json({
      schemes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      searchQuery: q
    });
    
  } catch (err) {
    console.error("Search schemes error:", err);
    res.status(500).json({ error: "Server Error" });
  }
}; 