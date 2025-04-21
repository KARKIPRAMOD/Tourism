const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");

const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUserCount,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads", "profile_pictures"); // Fixed path
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("Profile pictures directory created!");
    }
    cb(null, uploadDir); // Save to the 'profile_pictures' directory inside 'uploads'
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Use a unique filename based on the timestamp
  },
});

const upload = multer({ storage });

// Register user with profile image
router.post("/signup", upload.single("profile_image"), registerUser);

// Login
router.post("/login", loginUser);

// Get all users
router.get("/all", getAllUsers);

// Get user count
router.get("/count", getUserCount);

// Update user (without file upload for now)
router.put("/update/:id", updateUser);

// Delete
router.delete("/delete/:id", deleteUser);

// Get by ID
router.get("/:id", getUserById);

// Get by username
router.get("/get/:username", getUserByUsername);

module.exports = router;
