import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa"; // Icon for the image upload
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

function AddTourguide() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [nicNumber, setNicNumber] = useState("");
  const [eMail, setEmail] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState(""); // Description field
  const [image, setImage] = useState(null); // Image field
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

   const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location = "/home";
  };

  function sendData(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (
      !fullName ||
      !age ||
      !address ||
      !contactNumber ||
      !gender ||
      !nicNumber ||
      !eMail ||
      !workExperience ||
      !amount ||
      !description ||
      !image
    ) {
      setIsLoading(false);
      setError("All fields including description and image are required.");
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("age", age);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("gender", gender);
    formData.append("nicNumber", nicNumber);
    formData.append("eMail", eMail);
    formData.append("workExperience", workExperience);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("image", image); // Append image file

    axios
      .post("http://localhost:8070/tourguide/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Tourguide Added");

        // Reset form fields after successful submission
        resetForm();

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response) {
          console.error("Response error:", err.response.data);
        }
        setError(err.response?.data?.message || "Failed to add tourguide.");
        alert(
          err.response?.data?.message || "An error occurred while submitting."
        );
      });
  }

  // Function to reset form fields
  function resetForm() {
    setFullName("");
    setAge("");
    setAddress("");
    setContactNumber("");
    setGender("Male");
    setNicNumber("");
    setEmail("");
    setWorkExperience("");
    setAmount("");
    setDescription("");
    setImage(null);
  }

  return (
    <div className="d-flex">
      {/* Admin Sidebar */}
      <div
        className="sidebar p-4"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "240px",
          backgroundColor: "#2c2c54", // Dark Purple background color
          zIndex: 1000,
          borderRight: "2px solid #ddd", // Divider to match style
          paddingTop: "20px", // Adjust padding to ensure it's spaced properly
        }}
      >
        <h3 className="text-center text-white mb-4">Admin Panel</h3>
        <ul className="list-unstyled">
          <li>
            <Link
              to="/admin/dashboard"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-house-door me-2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/adminTourguide"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-person-lines-fill me-2"></i> Tour Guides
            </Link>
          </li>
          <li>
            <Link
              to="/adminHotel"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-building me-2"></i> Hotels
            </Link>
          </li>
          <li>
            <Link
              to="/adminPackage"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-card-list me-2"></i> Packages
            </Link>
          </li>
          <li>
            <Link
              to="/all/user"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-person-fill me-2"></i> Users
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-auto">
            <div
                onClick={handleLogout}
                className="d-flex align-items-center text-white px-3 py-2"
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="container p-4 bg-white rounded shadow-sm"
        style={{
          marginTop: "40px",
          marginLeft: "250px", // Adding left margin to avoid overlap with sidebar
          width: "calc(100% - 250px)", // Adjust width to fill space next to sidebar
        }}
      >
        <form onSubmit={sendData} encType="multipart/form-data">
          <div
            className="text-center mb-4"
            style={{
              color: "#2c2c54",
            }}
          >
            <h2>
              <strong>Add Tourguide Details</strong>
            </h2>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row">
            {/* Left side form fields */}
            <div className="form-group col-md-6">
              <label htmlFor="fullName" className="form-label">
                Tourguide Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                required
                placeholder="Enter Tourguide Name"
                value={fullName} // Controlled input
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                placeholder="Enter Age"
                value={age} // Controlled input
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                placeholder="Enter Address"
                value={address} // Controlled input
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                required
                placeholder="Enter Contact Number"
                value={contactNumber} // Controlled input
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-control"
                id="gender"
                value={gender} // Controlled input
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="nicNumber" className="form-label">
                NIC Number
              </label>
              <input
                type="text"
                className="form-control"
                id="nicNumber"
                required
                placeholder="Enter NIC Number"
                value={nicNumber} // Controlled input
                onChange={(e) => setNicNumber(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="eMail" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="eMail"
                required
                placeholder="Enter Email Address"
                value={eMail} // Controlled input
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="workExperience" className="form-label">
                Work Experience
              </label>
              <input
                type="text"
                className="form-control"
                id="workExperience"
                required
                placeholder="Enter Work Experience"
                value={workExperience} // Controlled input
                onChange={(e) => setWorkExperience(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="amount" className="form-label">
                Amount (per day)
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                required
                placeholder="Enter Amount"
                value={amount} // Controlled input
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Description and Image fields */}
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Enter a short description"
                value={description} // Controlled input
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="image" className="form-label">
                Upload Image <FaUpload />
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isLoading}
          >
            <strong>{isLoading ? "Submitting..." : "Submit"}</strong>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTourguide;
