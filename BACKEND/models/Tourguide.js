const mongoose = require("mongoose");

const tourguideSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
  },

  password: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
    default: "Male",
  },

  nicNumber: {
    type: String,
    required: true,
  },

  eMail: {
    type: String,
    required: true,
    unique: true,  // Ensure the email is unique
  },

  workExperience: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "tourguide", // Automatically assigns the role as "tourguide"
  },
});

const Tourguide = mongoose.model("Tourguide", tourguideSchema);

module.exports = Tourguide;
