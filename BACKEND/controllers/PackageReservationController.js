// controllers/packageReservationController.js
const PackageReservation = require("../models/PackageReservation");

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
