const express = require("express");
const router = express.Router();
const hotelReservationController = require("../controllers/HotelReservationController");

router.post("/reserve", hotelReservationController.reserveHotel);
router.get(
  "/reservedHotels/:userId",
  hotelReservationController.getUserReservations
);

module.exports = router;
