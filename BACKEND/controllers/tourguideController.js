const Tourguide = require("../models/Tourguide");
const mongoose = require("mongoose");

exports.getAllTourguides = async (req, res) => {
  try {
    const tourguides = await Tourguide.find();
    res.status(200).json({
      success: true,
      existingTourguides: tourguides,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.getTourguideById = async (req, res) => {
  try {
    console.log("Fetching tour guide with ID:", req.params.id); // <-- 🔍
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid tour guide ID" });
    }

    const fb = await Tourguide.findById(req.params.id);
    if (fb) {
      res.json(fb);
    } else {
      res.status(404).json({ message: "Tourguide not found" });
    }
  } catch (err) {
    console.error("Error in getTourguideById:", err); // <-- 🔍
    res.status(400).json({ error: err.message });
  }
};

exports.getTourguideCount = async (req, res) => {
  try {
    const count = await Tourguide.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting tourguide count:", error);
    res
      .status(500)
      .json({ message: "Error getting count", error: error.message });
  }
};

exports.addTourguide = async (req, res) => {
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
  } = req.body;

  // Validation check for required fields
  if (
    !fullName ||
    !age ||
    !address ||
    !dateOfBirth ||
    !contactNumber ||
    !nicNumber ||
    !eMail ||
    !workExperience ||
    !amount
  ) {
    return res.status(400).json({
      status: "Error",
      message: "All fields are required",
    });
  }

  const newTourguide = new Tourguide({
    fullName,
    age,
    address,
    dateOfBirth,
    contactNumber,
    gender: gender || "Male",
    nicNumber,
    eMail,
    workExperience,
    amount,
  });

  try {
    await newTourguide.save();
    res.json("Tour Guide Added Successfully!");
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Failed to add tour guide",
      error: err.message,
    });
  }
};

exports.updateTourguide = async (req, res) => {
  try {
    const fb = await Tourguide.findById(req.params.id);

    if (fb) {
      fb.fullName = req.body.fullName || fb.fullName;
      fb.age = req.body.age || fb.age;
      fb.address = req.body.address || fb.address;
      fb.dateOfBirth = req.body.dateOfBirth || fb.dateOfBirth;
      fb.contactNumber = req.body.contactNumber || fb.contactNumber;
      fb.gender =
        req.body.gender && req.body.gender.trim() !== ""
          ? req.body.gender
          : "Male";
      fb.nicNumber = req.body.nicNumber || fb.nicNumber;
      fb.eMail = req.body.eMail || fb.eMail;
      fb.workExperience = req.body.workExperience || fb.workExperience;
      fb.amount = req.body.amount || fb.amount;

      const updatedTourguide = await fb.save();
      res.json(updatedTourguide);
    } else {
      res.status(404).json({
        status: "Error",
        message: "Tourguide not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Can't Update Tourguide Details",
      error: error.message,
    });
  }
};

exports.deleteTourguide = async (req, res) => {
  try {
    const TId = req.params.id;
    await Tourguide.findByIdAndDelete(TId);
    res.status(200).send({ status: "Tour Guide Deleted" });
  } catch (err) {
    res.status(500).send({
      status: "Error with delete tourguide",
      error: err.message,
    });
  }
};
