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

    const reservations = await TourguideReservation.find({
      user: userId,
      isConfirmed: true, // Only show confirmed ones
    })
      .populate("tourguide", "tourguide_name")
      .sort({ startDate: 1 });

    if (!reservations.length) {
      return res
        .status(404)
        .json({ message: "No confirmed reservations found" });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
