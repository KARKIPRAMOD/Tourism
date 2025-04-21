const router = require("express").Router();
const verifyAdmin = require("../middleware/authMiddleware");
const {
  getAllTourguides,
  getTourguideById,
  getTourguideCount,
  addTourguide,
  updateTourguide,
  deleteTourguide,
} = require("../controllers/tourguideController");

// Public routes - accessible to all
router.get("/", getAllTourguides);

router.get("/all", getAllTourguides);

// Add this new route to get count for dashboard
router.get("/count", getTourguideCount);
router.get("/:id", getTourguideById);

// Protected routes - admin only
router.post("/add", verifyAdmin, addTourguide);

router.put("/update/:id", verifyAdmin, updateTourguide);

router.delete("/delete/:id", verifyAdmin, deleteTourguide);

module.exports = router;
