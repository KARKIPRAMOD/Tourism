import axios, { AxiosError } from "axios";
import React, { useState } from "react";

const FeedbackForm = ({ isOpen, toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackCategory: "",
    feedbackText: "",
    rating: "" || 1,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const URL = "http://localhost:8070/feedBack/submit";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, {
        name: formData.name,
        email: formData.email,
        feedbackCategory: formData.feedbackCategory,
        feedbackText: formData.feedbackText,
        rating: formData.rating,
      });
      const result = res.data;
      console.log(result);
      toggleForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response.data.messege);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-center">We Value Your Feedback!</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name:
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your Name (Optional)"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Your Email (Optional)"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="feedbackCategory" className="form-label">
                  Feedback Category:
                </label>
                <select
                  id="feedbackCategory"
                  name="feedbackCategory"
                  className="form-select"
                  value={formData.feedbackCategory}
                  onChange={handleChange}
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="feedbackText" className="form-label">
                  Your Feedback:
                </label>
                <textarea
                  id="feedbackText"
                  name="feedbackText"
                  className="form-control"
                  rows="4"
                  placeholder="Write your feedback here..."
                  value={formData.feedbackText}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating:
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="form-select"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Submit Feedback
                </button>
                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </div>
            </form>

            <button
              onClick={toggleForm}
              className="btn btn-danger mt-3"
              style={{ width: "100%" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
