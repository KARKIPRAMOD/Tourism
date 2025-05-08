const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  noOfPersons: {
    type: Number,
    required: true,
  },
  noOfRooms: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  isConfirmed: {
    type: Boolean,
    default: false, // Initially, the reservation is not confirmed
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
