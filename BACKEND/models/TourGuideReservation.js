const mongoose = require("mongoose");

const tourguideReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tourguide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourguide",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },

  isConfirmed: {
    type: Boolean,
    default: false, // Initially, the reservation is not confirmed
  },
});

module.exports = mongoose.model(
  "TourguideReservation",
  tourguideReservationSchema
);
