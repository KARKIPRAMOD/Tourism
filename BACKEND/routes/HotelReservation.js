const express = require("express");
const router = express.Router();
const hotelReservationController = require("../controllers/HotelReservationController");

router.post("/reserve", hotelReservationController.reserveHotel);
router.get(
  "/reservedHotels/:userId",
  hotelReservationController.getUserReservations
);
router.put(
  "/confirm/:reservationId",
  hotelReservationController.confirmReservation
); // Admin confirms

module.exports = router;
