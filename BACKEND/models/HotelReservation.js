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
  roomType: {
    type: String,
    required: true,
    enum: ["Normal", "AC", "Deluxe", "VIP Suite"], // match hotel's roomTypes
  },
  priceAtBooking: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
