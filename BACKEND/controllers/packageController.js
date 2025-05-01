const Package = require("../models/Package");

// Add a new package
exports.addPackage = async (req, res) => {
  try {
    const {
      packName,
      packID,
      Destination,
      NumOfDays,
      NumOfPassen,
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      description,
      destinations,
    } = req.body;

    const destinationArray = Array.isArray(destinations)
      ? destinations
      : destinations.split(",").map((item) => item.trim());

    const newPackage = new Package({
      packName,
      packID,
      Destination,
      destinations: destinationArray,
      NumOfDays,
      NumOfPassen,
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      description,
      photos: req.files ? req.files.map((file) => file.path) : [],
    });

    await newPackage.save();

    res.status(201).json({
      message: "Package added successfully",
      package: newPackage,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding package", error: err.message });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({ success: true, packages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get package by ID
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(pkg);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching package", error: err.message });
  }
};

// Update package by ID
exports.updatePackage = async (req, res) => {
  try {
    const {
      packName,
      packID,
      Destination,
      NumOfDays,
      NumOfPassen,
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      description,
      destinations,
    } = req.body;

    const destinationArray = Array.isArray(destinations)
      ? destinations
      : destinations?.split(",").map((item) => item.trim());

    const updateData = {
      packName,
      packID,
      Destination,
      destinations: destinationArray,
      NumOfDays,
      NumOfPassen,
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      description,
    };

    // If new images are uploaded, add them
    if (req.files && req.files.length > 0) {
      updateData.photos = req.files.map((file) => file.path);
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating package", error: err.message });
  }
};

// Delete package by ID
exports.deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting package", error: err.message });
  }
};

// Get count of all packages
exports.getPackageCount = async (req, res) => {
  try {
    const count = await Package.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error counting packages", error: err.message });
  }
};
