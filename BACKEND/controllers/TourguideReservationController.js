const TourguideReservation = require("../models/TourguideReservation");

// Create reservation
exports.reserveTourguide = async (req, res) => {
  try {
    const { userId, tourguideId, startDate, endDate } = req.body;

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

// Confirm reservation (admin)
exports.confirmReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const updated = await TourguideReservation.findByIdAndUpdate(
      reservationId,
      { isConfirmed: true },
      { new: true }
    ).populate("user tourguide");

    if (!updated) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation confirmed by admin",
      reservation: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to confirm reservation" });
  }
};

// Get confirmed reservations for a user
exports.getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all reservations for the user, including unconfirmed ones
    const reservations = await TourguideReservation.find({
      user: userId,
    })
      .populate("tourguide", "tourguide_name") // Populate tourguide details
      .sort({ startDate: 1 }); // Sort by start date

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    // Fetch all reservations, sorted by start date
    const reservations = await TourguideReservation.find({})
      .populate("user", "fullName email") // Populating user details
      .populate("tourguide", "fullName") // Populating tourguide details
      .sort({ startDate: 1 }); // Sorting by start date

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found" });
    }

    // Return the list of all reservations
    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
