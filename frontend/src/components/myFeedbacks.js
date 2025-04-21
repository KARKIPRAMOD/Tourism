import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditFeedback = () => {
  const [feedback, setFeedback] = useState({
    category: "",
    feedbackText: "",
    rating: 1,
    createdAt: "", // Ensure 'createdAt' is included in the state
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`/api/feedback/${id}`);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback for edit:", error);
      }
    };
    fetchFeedback();
  }, [id]);

  return (
    <div className="container mt-5">
      <h3>View Feedback</h3>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          value={feedback.category}
          className="form-control"
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Feedback Text</label>
        <textarea
          value={feedback.feedbackText}
          className="form-control"
          readOnly
        ></textarea>
      </div>

      <div className="form-group">
        <label>Rating</label>
        <input
          type="text"
          value={feedback.rating}
          className="form-control"
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Created At</label>
        <p>{new Date(feedback.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EditFeedback;
