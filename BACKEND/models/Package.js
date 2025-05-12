const mongoose = require("mongoose");

//Create Database Scheams
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
    required: true,
  },

  Transport: {
    type: String,
    required: true,
  },

  TourGuide: {
    type: String,
    required: true,
  },

  TotPrice: {
    type: String,
    required: true,
  },

  Images: {
    type: [String],
    required: false,
  },

  description:{
    type:String,
    required: true,
  }
});

const Package = mongoose.model("TourPackage", PackageSchema);

module.exports = Package;
