const PackageReservation = require("../models/PackageReservation");

// Create reservation
exports.createReservation = async (req, res) => {
  const { userId, packageId, startDate } = req.body;

  try {
    const reservation = new PackageReservation({
      user: userId,
      package: packageId,
      startDate,
    });

    await reservation.save();

    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (err) {
    res.status(500).json({ message: "Reservation failed", error: err.message });
  }
};

// Get confirmed reservations for a user
exports.getUserReservations = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await PackageReservation.find({
      user: userId,
    }).populate("package");

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Admin confirms reservation
exports.confirmReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const updated = await PackageReservation.findByIdAndUpdate(
      reservationId,
      { isConfirmed: true },
      { new: true }
    ).populate("user package");

    if (!updated) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res
      .status(200)
      .json({ message: "Reservation confirmed", reservation: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Confirmation failed", error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    // Fetch all reservations, populate user and package details
    const reservations = (await PackageReservation.find().populate("user package")
      .populate("user", "full_name email profile_picture phone")
)
    

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json({ success: true, reservations });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching reservations", error: err.message });
  }
};