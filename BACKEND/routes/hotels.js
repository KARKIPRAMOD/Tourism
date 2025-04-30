const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addHotel,
  getAllHotels,
  getHotelCount,
  updateHotel,
  deleteHotel,
  getHotelById,
} = require("../controllers/hotelController");

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/hotel_photos/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add new hotel with photos
router.post("/add", upload.array("photos", 10), addHotel);

// View all hotels
router.get("/all", getAllHotels);

// Get hotel count
router.get("/count", getHotelCount);

// Update hotel by ID with photos
router.put("/update/:id", upload.array("photos", 10), updateHotel);

// Delete hotel by ID
router.delete("/delete/:id", deleteHotel);

// Get hotel by ID
router.get("/get/:id", getHotelById);

module.exports = router;
