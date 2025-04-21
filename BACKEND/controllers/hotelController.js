const Hotel = require("../models/Hotel");

// Add new hotel
exports.addHotel = async (req, res) => {
  const { name, type, location, price, no_of_rooms } = req.body;

  const newHotel = new Hotel({
    name,
    type,
    location,
    price,
    no_of_rooms,
  });

  try {
    await newHotel.save();
    res.json("Hotel Added");
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    res.status(400).json({ error: err.message });
  }
};

// Get hotel count for dashboard
exports.getHotelCount = async (req, res) => {
  try {
    const count = await Hotel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting count", error: error.message });
  }
};

// Update hotel
exports.updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { name, type, location, price, no_of_rooms } = req.body;

    const updateHotel = {
      name,
      type,
      location,
      price,
      no_of_rooms,
    };

    await Hotel.findByIdAndUpdate(hotelId, updateHotel);
    res.status(200).send({ status: "Hotel updated" });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  }
};

// Delete hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).send({ status: "Hotel deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with deleting hotel", error: err.message });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (hotel) {
      res.status(200).send({ status: "Hotel fetched", hotel });
    } else {
      res.status(404).send({ status: "Hotel not found" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with fetching hotel", error: err.message });
  }
};
