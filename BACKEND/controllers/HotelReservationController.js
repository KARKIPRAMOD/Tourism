const Reservation = require("../models/HotelReservation");

exports.reserveHotel = async (req, res) => {
  try {
    const { userId, hotelId, startDate, endDate, noOfPersons, noOfRooms } =
      req.body;

    const reservation = new HotelReservation({
      user: userId,
      hotel: hotelId,
      startDate,
      endDate,
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
exports.getUserReservations = async (req, res) => {
  const userId = req.user.id;

  try {
    const reservations = await Reservation.find({ user: userId }).populate(
      "hotel"
    );

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
