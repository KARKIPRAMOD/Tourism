const express = require("express");
const {
  addCusPack,
  getAllCusPacks,
  getCusPackById,
  updateCusPack,
  deleteCusPack,
} = require("../controllers/cusPackController");

const router = express.Router();

// Add new Customer Package
router.post("/add", addCusPack);

// View all Customer Packages
router.get("/all", getAllCusPacks);

// Retrieve a Customer Package by ID
router.get("/get/:id", getCusPackById);

// Update Customer Package
router.patch("/update/:id", updateCusPack);

// Delete Customer Package
router.delete("/delete/:id", deleteCusPack);

module.exports = router;
