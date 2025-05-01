// routes/packageReservationRoutes.js
const express = require("express");
const router = express.Router();
const {
  createReservation,
  getUserReservations,
} = require("../controllers/PackageReservationController");

router.post("/reserve", createReservation);
router.get("/reservations/:userId", getUserReservations);

module.exports = router;
