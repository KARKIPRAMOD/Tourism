const fs = require("fs");
const path = require("path");
const Hotel = require("../models/Hotel");

// Ensure uploads directory exists
const uploadDir = "uploads/hotel_photos";
fs.mkdirSync(uploadDir, { recursive: true });

// Add new hotel
exports.addHotel = async (req, res) => {
  const { name, type, location, no_of_rooms, description, roomTypes,map } = req.body;
  const photos = req.files ? req.files.map((file) => file.filename) : [];

  let parsedRoomTypes = [];
  try {
    parsedRoomTypes = roomTypes ? JSON.parse(roomTypes) : [];
  } catch (err) {
    return res.status(400).json({ success: false, error: "Invalid roomTypes format" });
  }

  const newHotel = new Hotel({
    name,
    type,
    location,
    no_of_rooms,
    photos,
    description,
    roomTypes: parsedRoomTypes,
    map
  });

  try {
    await newHotel.save();
    res.json({ success: true, message: "Hotel Added", hotel: newHotel });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({
      success: true,
      existingHotels: hotels,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get hotel count for dashboard
exports.getHotelCount = async (req, res) => {
  try {
    const count = await Hotel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting count",
      error: error.message,
    });
  }
};

// Update hotel
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  const { name, type, location, no_of_rooms, description, roomTypes } = req.body;

  const updateData = {
    name,
    type,
    location,
    no_of_rooms,
    description,
    map
  };

  if (roomTypes) {
    try {
      updateData.roomTypes = JSON.parse(roomTypes);
    } catch (err) {
      return res.status(400).json({ success: false, error: "Invalid roomTypes format" });
    }
  }

  if (req.files && req.files.length > 0) {
    updateData.photos = req.files.map((file) => file.filename);
  }

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateData, {
      new: true,
    });

    if (!updatedHotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Hotel updated", hotel: updatedHotel });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating hotel",
      error: err.message,
    });
  }
};

// Delete hotel
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    res.status(200).json({ success: true, message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting hotel",
      error: err.message,
    });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    res.status(200).json({ success: true, hotel });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching hotel",
      error: err.message,
    });
  }
};
