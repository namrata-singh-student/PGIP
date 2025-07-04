const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Register User (Sign Up)
exports.registerUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      age, 
      occupation, 
      state, 
      city, 
      phone 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: "User with this email already exists" 
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ 
        error: "Password must be at least 8 characters long" 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      age: age || undefined,
      occupation: occupation || '',
      state: state || '',
      city: city || '',
      phone: phone || ''
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      profile: user.getProfile()
    });

  } catch (err) {
    console.error("Registration error:", err);
    
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: "Email already exists" 
      });
    }
    
    res.status(500).json({ 
      error: "Server Error. Please try again." 
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        error: "Invalid email or password" 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        error: "Invalid email or password" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      profile: user.getProfile()
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      error: "Server Error. Please try again." 
    });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        error: "User with this email does not exist" 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // In a real application, you would send an email here
    // For now, we'll just return a success message
    res.status(200).json({
      message: "Password reset link sent to your email",
      resetToken // Remove this in production
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ 
      error: "Server Error. Please try again." 
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        error: "Invalid or expired reset token" 
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ 
      error: "Server Error. Please try again." 
    });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    res.status(200).json({
      profile: user.getProfile()
    });

  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ 
      error: "Server Error. Please try again." 
    });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, age, occupation, state, city, phone } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    // Update fields
    if (name) user.name = name;
    if (age) user.age = age;
    if (occupation) user.occupation = occupation;
    if (state) user.state = state;
    if (city) user.city = city;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      profile: user.getProfile()
    });

  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ 
      error: "Server Error. Please try again." 
    });
  }
};
