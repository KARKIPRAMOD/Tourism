const mongoose = require("mongoose");

const packageReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourPackage",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },

  isConfirmed: {
    type: Boolean,
    default: false, // Initially, the reservation is not confirmed
  },
});

module.exports = mongoose.model("PackageReservation", packageReservationSchema);
