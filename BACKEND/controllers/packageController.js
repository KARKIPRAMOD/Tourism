const Package = require("../models/Package");

// Add a new package
exports.addPackage = async (req, res) => {
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
  } = req.body;

  const newPack = new Package({
    packName,
    packID,
    Destination,
    NumOfDays,
    NumOfPassen,
    Hotel,
    Transport,
    TourGuide,
    TotPrice,
  });

  try {
    await newPack.save();
    res.json("Tour Package Created Successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({
      success: true,
      existingPackages: packages,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get package by ID
exports.getPackageById = async (req, res) => {
  try {
    const pk = await Package.findById(req.params.id);
    if (pk) {
      res.status(200).json(pk);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update package details
exports.updatePackage = async (req, res) => {
  try {
    const pk = await Package.findById(req.params.id);

    if (pk) {
      pk.packName = req.body.packName || pk.packName;
      pk.packID = req.body.packID || pk.packID;
      pk.Destination = req.body.Destination || pk.Destination;
      pk.NumOfDays = req.body.NumOfDays || pk.NumOfDays;
      pk.NumOfPassen = req.body.NumOfPassen || pk.NumOfPassen;
      pk.Hotel = req.body.Hotel || pk.Hotel;
      pk.Transport = req.body.Transport || pk.Transport;
      pk.TourGuide = req.body.TourGuide || pk.TourGuide;
      pk.TotPrice = req.body.TotPrice || pk.TotPrice;

      const updatedPackage = await pk.save();

      res.status(200).json(updatedPackage);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete package
exports.deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    await Package.findByIdAndDelete(packageId);
    res.status(200).send({ status: "Package Deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with deleting package", error: err.message });
  }
};

// Get package count for dashboard
exports.getPackageCount = async (req, res) => {
  try {
    const count = await Package.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting count", error: err.message });
  }
};
