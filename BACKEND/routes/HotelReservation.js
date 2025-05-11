const express = require("express");
const router = express.Router();
const hotelReservationController = require("../controllers/HotelReservationController");

router.get("/", hotelReservationController.getAllReservations);

router.post("/reserve", hotelReservationController.reserveHotel);

router.get(
  "/reservedHotels/:userId",
  hotelReservationController.getUserReservations
);
router.put(
  "/confirm/:reservationId",
  hotelReservationController.confirmReservation
); 

module.exports = router;
