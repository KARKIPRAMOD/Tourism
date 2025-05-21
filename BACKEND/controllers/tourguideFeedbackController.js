const TourguideFeedback = require("../models/tourguideFeedback");

// Add new feedback
exports.addFeedback = async (req, res) => {
  try {
    const { userId, tourguideId, reservationId, rating, message } = req.body;

    // Check if feedback already exists for this reservation
    const existingFeedback = await TourguideFeedback.findOne({ reservationId });
    if (existingFeedback) {
      return res.status(400).json({ message: "Feedback already submitted for this reservation." });
    }

    // Create new feedback
    const feedback = new TourguideFeedback({
      userId,
      tourguideId,
      reservationId,
      rating,
      message,
    });

    await feedback.save();

    return res.status(201).json({ message: "Feedback added successfully!", feedback });
  } catch (error) {
    console.error("Add feedback error:", error);
    return res.status(500).json({ message: "Server error. Could not add feedback." });
  }
};

// Get feedback by tourguideId
exports.getFeedbackByTourguide = async (req, res) => {
  try {
    const { tourguideId } = req.params;

    const feedbacks = await TourguideFeedback.find({ tourguideId })
      .populate("userId", "fullName email") // populate user details if needed
      .sort({ createdAt: -1 });

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json({ message: "Server error. Could not get feedback." });
  }
};

// Get feedback by userId
exports.getFeedbackByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const feedbacks = await TourguideFeedback.find({ userId })
      .populate("tourguideId", "fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json({ message: "Server error. Could not get feedback." });
  }
};

// Optional: Get all feedbacks (admin use)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await TourguideFeedback.find()
      .populate("userId", "fullName")
      .populate("tourguideId", "fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Get all feedbacks error:", error);
    return res.status(500).json({ message: "Server error. Could not get feedbacks." });
  }
};
