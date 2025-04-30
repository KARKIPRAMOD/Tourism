const express = require("express");
const router = express.Router();
const createUploader = require("../middleware/upload");
const upload = createUploader("profile_pictures");

const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUserCount,
  getAllUsers,
} = require("../controllers/userController");

router.post("/signup", upload.single("profile_image"), registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/count", getUserCount);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUserById);
router.get("/get/:username", getUserByUsername);

module.exports = router;
