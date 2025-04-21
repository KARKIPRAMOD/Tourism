const CusPack = require("../models/CusPack");

exports.addCusPack = async (req, res) => {
  const {
    name,
    email,
    phone,
    arriDate,
    pickPlace,
    destination,
    NofDays,
    NoPass,
    notes,
  } = req.body;

  const newCusPack = new CusPack({
    name,
    email,
    phone,
    arriDate,
    pickPlace,
    destination,
    NofDays,
    NoPass,
    notes,
  });

  try {
    await newCusPack.save();
    res.json("Your package is successfully created!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCusPacks = async (_req, res) => {
  try {
    const cusPacks = await CusPack.find();
    res.status(200).json({
      success: true,
      existingCusPacks: cusPacks,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCusPackById = async (req, res) => {
  try {
    const cp = await CusPack.findById(req.params.id);
    if (cp) {
      res.json(cp);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCusPack = async (req, res) => {
  try {
    const cp = await CusPack.findById(req.params.id);
    if (cp) {
      cp.name = req.body.name || cp.name;
      cp.email = req.body.email || cp.email;
      cp.phone = req.body.phone || cp.phone;
      cp.arriDate = req.body.arriDate || cp.arriDate;
      cp.pickPlace = req.body.pickPlace || cp.pickPlace;
      cp.destination = req.body.destination || cp.destination;
      cp.NofDays = req.body.NofDays || cp.NofDays;
      cp.NoPass = req.body.NoPass || cp.NoPass;
      cp.notes = req.body.notes || cp.notes;

      const updatedCusPack = await cp.save();
      res.json(updatedCusPack);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCusPack = async (req, res) => {
  try {
    await CusPack.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "Package Cancelled..!!" });
  } catch (err) {
    res.status(500).send({
      status: "Error with delete package",
      error: err.message,
    });
  }
};
