const mongoose = require("mongoose");

// Create variable of schema
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true, // backend validation
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  no_of_rooms: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // Only keep per-room-type pricing
  roomTypes: [
    {
      roomType: {
        type: String,
        required: true,
        enum: ["Normal", "AC", "Deluxe", "VIP Suite"] // Optional restriction
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  
  map: {
  type: String,  // Store the full Bing Maps URL here
  required: true,
},

});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
