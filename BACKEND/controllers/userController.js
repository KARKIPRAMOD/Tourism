const User = require("../models/user");

// Register new user
exports.registerUser = async (req, res) => {
  const {
    user_name,
    full_name,
    email,
    password,
    role = "user",
    address,
    phone,
  } = req.body;

  const profile_picture = req.file ? req.file.filename : "default.jpg";

  try {
    const existingUser = await User.findOne({
      $or: [{ user_name }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.user_name === user_name
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const newUser = new User({
      user_name,
      full_name,
      email,
      password,
      role,
      address,
      phone,
      profile_picture,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Registration successful!",
      user: newUser,
    });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      user: {
        ...user._doc,
        role: user.role || "user",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, full_name, email, password, address, phone } = req.body;

  const update = {
    user_name,
    full_name,
    email,
    password,
    address,
    phone,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, update);

    if (updatedUser.modifiedCount > 0) {
      res.json("User details updated successfully!");
    } else {
      res.status(400).json("No changes made to user details");
    }
  } catch (err) {
    res.status(500).json("Error updating user: " + err.message);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.json("User deleted successfully!");
  } catch (err) {
    res.status(400).json("Error : " + err.message);
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(400).json("Error : " + err.message);
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.params.username });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(400).json("Error : " + err.message);
  }
};

// Get count of users
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting user count", error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};
