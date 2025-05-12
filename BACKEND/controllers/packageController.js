const Package = require("../models/Package"); // Import the Package model
const fs = require("fs");
const path = require("path");

// Function to add a new package
const addPackage = async (req, res) => {
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
      description
    } = req.body;

    // Collect image paths if any images are uploaded
    const images = req.files ? req.files.map((file) => file.path) : [];

    const newPackage = new Package({
      packName,
      packID,
      Destination,
      NumOfDays,
      NumOfPassen,
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      Images: images, // Save the image paths in the database
      description

    });

    // Save the package to the database
    await newPackage.save();
    res.status(200).json({ message: "Package added successfully" }); // Send success response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding package" }); // Send error response
  }
};

// Function to get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching packages" });
  }
};

// Function to get a package by ID
const getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(package); // Return the package
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching package" });
  }
};

// Function to update a package
const updatePackage = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // Handle new images upload if any
    if (req.files) {
      const images = req.files.map((file) => file.path);
      updatedData.Images = images; // Update the images if new ones are uploaded
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json(updatedPackage); // Return the updated package
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating package" });
  }
};

// Function to delete a package
const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Delete images from the file system (optional)
    deletedPackage.Images.forEach((imagePath) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image: ${imagePath}`);
        }
      });
    });

    res.status(200).json({ message: "Package deleted successfully" }); // Send success response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting package" });
  }
};

// Function to get the total package count
const getPackageCount = async (req, res) => {
  try {
    const count = await Package.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching package count" });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackageCount,
};
