const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
  getFeedbackByUser,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedBackController.js");

// Submit feedback
router.post("/submit", submitFeedback);

// Get all feedback (admin)
router.get("/all", getAllFeedback);

// Get feedbacks by user
router.get("/user/:userId", getFeedbackByUser);

// Update feedback by ID
router.put("/update/:id", updateFeedback);

// Delete feedback by ID
router.delete("/delete/:id", deleteFeedback);

module.exports = router;
