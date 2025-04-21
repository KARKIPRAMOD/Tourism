const express = require("express");
const {
  addHotel,
  getAllHotels,
  getHotelCount,
  updateHotel,
  deleteHotel,
  getHotelById,
} = require("../controllers/hotelController");

const router = express.Router();

// Add new hotel
router.post("/add", addHotel);

// View all hotels
router.get("/all", getAllHotels);

// Get hotel count
router.get("/count", getHotelCount);

// Update hotel by ID
router.put("/update/:id", updateHotel);

// Delete hotel by ID
router.delete("/delete/:id", deleteHotel);

// Get hotel by ID
router.get("/get/:id", getHotelById);

module.exports = router;
