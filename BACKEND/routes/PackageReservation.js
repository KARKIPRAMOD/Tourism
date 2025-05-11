const express = require("express");
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  confirmReservation,
  getAllReservations
} = require("../controllers/packageReservationController");

router.get("/", getAllReservations);
router.post("/reserve", createReservation);
router.get("/reservations/:userId", getUserReservations);
router.put("/confirm/:reservationId", confirmReservation); // Admin confirms

module.exports = router;
