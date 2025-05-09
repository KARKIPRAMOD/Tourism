const express = require("express");
const router = express.Router();
const {
  reserveTourguide,
  confirmReservation,
  getUserReservations,
  getAllReservations,
} = require("../controllers/TourguideReservationController");

// POST - Make a new reservation
router.post("/reserve", reserveTourguide);

router.get("/", getAllReservations);

// PUT - Admin confirms a reservation
router.put("/confirm/:reservationId", confirmReservation);

// GET - Show confirmed reservations for a user
router.get("/reservedTourGuides/:userId", getUserReservations);

module.exports = router;
