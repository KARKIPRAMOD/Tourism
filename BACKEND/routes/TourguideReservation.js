const express = require("express");
const router = express.Router();
const TourguideReservation = require("../models/TourguideReservation");

// POST /reserve
router.post("/reserve", async (req, res) => {
  try {
    const { userId, tourguideId, startDate, endDate } = req.body;

    // Check for overlapping reservation
    const existingReservation = await TourguideReservation.findOne({
      tourguide: tourguideId,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({ message: "Tour guide already reserved for these dates" });
    }

    // Create reservation
    const reservation = new TourguideReservation({
      user: userId,
      tourguide: tourguideId,
      startDate,
      endDate,
    });

    await reservation.save();

    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/reservedTourGuides/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("GET /reservedTourGuides request for userId:", userId); // Log the userId parameter

    const reservations = await TourguideReservation.find({ user: userId })
      .populate("tourguide", "tourguide_name") // Populate the tourguide name
      .sort({ startDate: 1 }); // Sort by start date

    if (!reservations.length) {
      console.log("No reservations found for userId:", userId); // Log if no reservations are found
      return res.status(404).json({ message: "No reserved tour guides found" });
    }

    console.log("Reserved tour guides found:", reservations); // Log the reservations

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error in /reservedTourGuides route:", err); // Log any errors in the catch block
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
