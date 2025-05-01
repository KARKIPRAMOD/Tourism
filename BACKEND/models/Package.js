const mongoose = require("mongoose");

//Create Database Schema
const PackageSchema = new mongoose.Schema({
  packName: {
    type: String,
    required: true,
  },

  packID: {
    type: String,
    required: true,
  },

  Destination: {
    type: String,
    required: true,
  },

  destinations: [
    {
      name: { type: String, required: true },
      description: { type: String },
    },
  ],

  NumOfDays: {
    type: Number,
    required: true,
  },

  NumOfPassen: {
    type: Number,
    required: true,
  },

  Hotel: {
    type: String,
  },

  Transport: {
    type: String,
  },

  TourGuide: {
    type: String,
  },

  TotPrice: {
    type: String,
    required: true,
  },

  photos: {
    type: [String],
  },
});

// Create a model
const Package = mongoose.model("TourPackage", PackageSchema);

module.exports = Package;
