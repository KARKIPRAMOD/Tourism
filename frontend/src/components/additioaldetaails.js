import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TourguideAdditionalInfo = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [workExperience, setWorkExperience] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  // Fetch the user details after login
  useEffect(() => {
    const userId = localStorage.getItem("userId");  // Assuming userId is stored in localStorage

    if (!userId) {
      history.push("/login");  // Redirect to login if no userId
      return;
    }

    // Fetch user details from the backend
    axios
      .get(`http://localhost:8070/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserDetails({
          fullName: response.data.full_name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
        });
      })
      .catch((err) => {
        setError("Failed to fetch user details");
        console.error("Error fetching user details:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workExperience || !amount || !description || !image) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("userId"));  // Include userId
    formData.append("workExperience", workExperience);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("image", image); // Attach the image file

    try {
      const response = await axios.post(
        "http://localhost:8070/tourguide/add", // Update tourguide data endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        alert("Tourguide details updated successfully!");
        history.push("/dashboard");  // Redirect to the dashboard or any page you want
      }
    } catch (err) {
      setIsLoading(false);
      setError("Failed to update tourguide details.");
      console.error("Error submitting details:", err);
    }
  };

  if (!userDetails.fullName) {
    return <div>Loading...</div>;  // Show loading if data is not yet available
  }

  return (
    <div className="container">
      <h2>Fill in Your Tourguide Information</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Pre-filled User Information */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.fullName}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={userDetails.email}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.phone}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.address}
            readOnly
          />
        </div>

        {/* Tourguide-Specific Information */}
        <div className="form-group">
          <label>Work Experience</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter work experience"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount per Day</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Enter a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TourguideAdditionalInfo;
