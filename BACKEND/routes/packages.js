const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackageCount,
} = require("../controllers/packageController");

const router = express.Router();

// Multer setup for package image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/package_photos/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add new package with photos
router.post("/add", upload.array("photos", 10), addPackage);

// View all packages
router.get("/all", getAllPackages);

// Get package count
router.get("/count", getPackageCount);

// Update package by ID with photos
router.put("/update/:id", upload.array("photos", 10), updatePackage);

// Delete package by ID
router.delete("/delete/:id", deletePackage);

// Get package by ID
router.get("/get/:id", getPackageById);

module.exports = router;
