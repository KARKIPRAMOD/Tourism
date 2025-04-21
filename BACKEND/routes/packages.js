const express = require("express");
const {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackageCount,
} = require("../controllers/packageController");

const router = express.Router();

// Add new package
router.post("/add", addPackage);

// Get all packages
router.get("/all", getAllPackages);

// Get package count for dashboard
router.get("/count", getPackageCount);

// Get package by ID
router.get("/get/:id", getPackageById);

// Update package by ID
router.patch("/update/:id", updatePackage);

// Delete package by ID
router.delete("/delete/:id", deletePackage);

module.exports = router;
