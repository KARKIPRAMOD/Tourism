const Tourguide = require("../models/tourguide");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads", "tourguide_pictures");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Tour guide pictures directory created!");
}

// Register new tour guide
exports.registerTourGuide = async (req, res) => {
  const {
    fullName,
    age,
    address,
    contactNumber,
    gender,
    nicNumber,
    eMail,
    workExperience,
    amount,
    description,
  } = req.body;

  const image = req.file ? req.file.filename : "default.jpg";

  try {
    const existing = await Tourguide.findOne({
      $or: [{ nicNumber }, { eMail }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          existing.nicNumber === nicNumber
            ? "Tour guide with this NIC already exists"
            : "Tour guide with this email already exists",
      });
    }

    const newGuide = new Tourguide({
      fullName,
      age,
      address,
      contactNumber,
      gender,
      nicNumber,
      eMail,
      workExperience,
      amount,
      image,
      description,
    });

    await newGuide.save();
    res.status(201).json({
      success: true,
      message: "Tour guide registered successfully!",
      guide: newGuide,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all tour guides
exports.getAllTourGuides = async (req, res) => {
  try {
    const guides = await Tourguide.find();
    res.json({ success: true, guides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single tour guide by ID
exports.getTourGuideById = async (req, res) => {
  try {
    const guide = await Tourguide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, guide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update tour guide
exports.updateTourGuide = async (req, res) => {
  const {
    fullName,
    age,
    address,
    dateOfBirth,
    contactNumber,
    gender,
    nicNumber,
    eMail,
    workExperience,
    amount,
    description,
  } = req.body;

  const update = {
    fullName,
    age,
    address,
    dateOfBirth,
    contactNumber,
    gender,
    nicNumber,
    eMail,
    workExperience,
    amount,
    description,
  };

  if (req.file) {
    update.image = req.file.filename;
  }

  try {
    const updated = await Tourguide.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      message: "Updated successfully",
      guide: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete tour guide
exports.deleteTourGuide = async (req, res) => {
  try {
    const result = await Tourguide.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, message: "Tour guide deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get total count of tour guides
exports.getTourGuideCount = async (req, res) => {
  try {
    const count = await Tourguide.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
