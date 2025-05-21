const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/tourguideFeedbackController");

router.post("/add", (req, res, next) => {
  console.log("POST /tourguideFeedback/add received", req.body);
  next(); 
}, feedbackController.addFeedback);
router.get("/tourguide/:tourguideId", feedbackController.getFeedbackByTourguide);
router.get("/user/:userId", feedbackController.getFeedbackByUser);
router.get("/", feedbackController.getAllFeedbacks); 

module.exports = router;
