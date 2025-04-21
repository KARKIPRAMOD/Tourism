// tourguideReservationController.js
const TourguideReservation = require("../models/TourguideReservation");

exports.reserveTourguide = async (req, res) => {
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

    // Create a new reservation
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
};
