const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const verifyAdmin = require("../middleware/authMiddleware");
const {
  getAllTourGuides,
  getTourGuideById,
  getTourGuideCount,
  registerTourGuide,
  updateTourGuide,
  deleteTourGuide,
  loginTourguide
} = require("../controllers/tourguideController");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "tourguide_pictures"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// Public routes
router.get("/", getAllTourGuides);
router.get("/all", getAllTourGuides);
router.get("/count", getTourGuideCount);
router.post("/login", loginTourguide);

router.get("/:id", getTourGuideById);

// Admin-protected routes
router.post("/add", verifyAdmin, upload.single("image"), registerTourGuide);
router.put("/update/:id", verifyAdmin, upload.single("image"), updateTourGuide);
router.delete("/delete/:id", verifyAdmin, deleteTourGuide);

module.exports = router;
