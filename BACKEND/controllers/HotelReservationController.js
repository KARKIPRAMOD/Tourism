const Reservation = require("../models/HotelReservation");

// Reserve hotel
exports.reserveHotel = async (req, res) => {
  try {
    const { user, hotel, startDate, endDate, noOfPersons, noOfRooms } =
      req.body;

    const reservation = new Reservation({
      user,
      hotel,
      fromDate: startDate,
      toDate: endDate,
      noOfPersons,
      noOfRooms,
    });

    await reservation.save();

    res
      .status(201)
      .json({ message: "Hotel reserved successfully", reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get confirmed reservations for a user
exports.getUserReservations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const reservations = await Reservation.find({
      user: userId,
    }).populate("hotel");

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Admin confirms reservation
exports.confirmReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const updated = await Reservation.findByIdAndUpdate(
      reservationId,
      { isConfirmed: true },
      { new: true }
    ).populate("hotel user");

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

// For getting all reservations (Admin or anyone with permission)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("hotel user");

    if (reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservations", error: err.message });
  }
};

