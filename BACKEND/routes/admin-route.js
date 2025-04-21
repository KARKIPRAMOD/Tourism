const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyAdmin = require("../middleware/authMiddleware");

const router = express.Router();

console.log("Admin routes loaded and initialized");

// Test route that doesn't require authentication
router.get("/", (req, res) => {
  res.json({ message: "Admin API is working" });
});

// Admin login route
router.post("/login", async (req, res) => {
  console.log("Admin login route accessed", req.body);

  try {
    const { email, password } = req.body;

    console.log("Admin login attempt received:", {
      email,
      passwordProvided: !!password,
    });

    // Handle missing credentials
    if (!email || !password) {
      console.log("Missing credentials");
      return res
        .status(400)
        .json({ message: "Email/username and password are required" });
    }

    // For quick testing - hardcoded admin check
    if (email === "admin" && password === "admin") {
      console.log("Using hardcoded admin credentials");

      const token = jwt.sign(
        {
          id: "admin_id",
          role: "admin",
          name: "System Administrator",
        },
        process.env.JWT_SECRET || "travelo_jwt_secret",
        { expiresIn: "1h" }
      );

      return res.json({
        token,
        userId: "admin_id",
        role: "admin",
        name: "System Administrator",
      });
    }

    // Look for admin user by email or username
    const admin = await User.findOne({
      $or: [{ email: email }, { user_name: email }],
      role: "admin",
    });

    if (!admin) {
      console.log("Admin not found for:", email);

      // For debugging only - find if user exists but isn't admin
      const userExists = await User.findOne({
        $or: [{ email: email }, { user_name: email }],
      });

      if (userExists) {
        console.log(`User found but role is: ${userExists.role}, not admin`);
      } else {
        console.log("No user with this email/username exists");
      }

      return res.status(400).json({ message: "Admin account not found" });
    }

    console.log("Admin found:", { username: admin.user_name, id: admin._id });

    // For simple password comparison (exactly as stored in DB)
    const validPassword = admin.password === password;
    console.log("Password validation:", validPassword);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create token with admin information
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        name: admin.full_name || admin.user_name,
      },
      process.env.JWT_SECRET || "travelo_jwt_secret",
      { expiresIn: "1h" }
    );

    console.log("Admin login successful for:", admin.user_name);

    res.json({
      token,
      userId: admin._id,
      role: admin.role,
      name: admin.full_name || admin.user_name,
    });
  } catch (error) {
    console.error("Admin login server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Test route to verify API is working
router.get("/test", (req, res) => {
  res.json({ message: "Admin API is working" });
});

// Protected admin dashboard data route
router.get("/dashboard", verifyAdmin, async (req, res) => {
  try {
    // Example of a protected route that returns admin dashboard data
    const counts = {
      tourGuideCount: await User.countDocuments({ role: "tourguide" }),
      // Add other counts as needed
    };

    res.json(counts);
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
