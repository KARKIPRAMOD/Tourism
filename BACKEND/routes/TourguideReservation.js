const express = require("express");
const router = express.Router();
const {
  reserveTourguide,
  confirmReservation,
  getUserReservations,
  getAllReservations,
  getTourguideReservations
} = require("../controllers/TourguideReservationController");

// POST - Make a new reservation
router.post("/reserve", reserveTourguide);

router.get("/", getAllReservations);

// Get the latest reservation for a specific tour guide
router.get("/tourguide/:id/availability", async (req, res) => {
  try {
    const tourguideId = req.params.id;

    // Find the latest reservation for the given tourguide
    const latestReservation = await TourguideReservation.findOne({ tourguide: tourguideId })
      .sort({ startDate: -1 })  // Sort by start date, descending (most recent first)
      .populate("tourguide", "tourguide_name");  // Populate tourguide name for easy access

    if (!latestReservation) {
      return res.status(404).json({ message: "No reservations found for this tour guide." });
    }

    // Send the latest reservation details, including the end date or next available date
    const availableDate = latestReservation.startDate;  // Assuming the next availability is after the reservation's end

    res.status(200).json({ availableDate: availableDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// PUT - Admin confirms a reservation
router.put("/confirm/:reservationId", confirmReservation);

// GET - Show confirmed reservations for a user
router.get("/reservedTourGuides/:userId", getUserReservations);

router.get("/reservedforTourGuides/:tourguideId", getTourguideReservations);


module.exports = router;
