const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackageCount,
} = require("../controllers/packageController");

const router = express.Router();

// ✅ Ensure upload folder exists
const uploadDir = "uploads/package_photos";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
router.get("/all", getAllPackages);
router.post("/add", upload.array("images", 10), addPackage);
router.get("/count", getPackageCount);
router.get("/get/:id", getPackageById);
router.patch("/update/:id", upload.array("images", 10), updatePackage);
router.delete("/delete/:id", deletePackage);

module.exports = router;
