// models/TourUpdate.js
const mongoose = require('mongoose');

const tourUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TourUpdate = mongoose.model('TourUpdate', tourUpdateSchema);

module.exports = TourUpdate;
