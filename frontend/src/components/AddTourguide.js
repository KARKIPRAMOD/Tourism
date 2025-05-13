import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa"; // Icon for the image upload

const token = localStorage.getItem("token");

function AddTourguide() {
  const [userName, setUserName] = useState("");  // Username field
  const [password, setPassword] = useState("");  // Password field
  const [fullName, setFullName] = useState("");  // Tourguide name
  const [age, setAge] = useState("");  // Age
  const [address, setAddress] = useState("");  // Address
  const [contactNumber, setContactNumber] = useState("");  // Contact number
  const [gender, setGender] = useState("Male");  // Gender
  const [nicNumber, setNicNumber] = useState("");  // NIC number
  const [eMail, setEmail] = useState("");  // Email address
  const [workExperience, setWorkExperience] = useState("");  // Work experience
  const [amount, setAmount] = useState("");  // Amount (per day)
  const [description, setDescription] = useState("");  // Description field
  const [image, setImage] = useState(null);  // Image field
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation check to ensure no field is left empty
    if (
      !userName ||
      !password ||
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
      setError("All fields including username, password, description, and image are required.");
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("user_name", userName);  // Add the username
    formData.append("password", password);  // Add the password
    formData.append("fullName", fullName);  // Add the full name
    formData.append("age", age);  // Add the age
    formData.append("address", address);  // Add the address
    formData.append("contactNumber", contactNumber);  // Add the contact number
    formData.append("gender", gender);  // Add the gender
    formData.append("nicNumber", nicNumber);  // Add the NIC number
    formData.append("eMail", eMail);  // Add the email
    formData.append("workExperience", workExperience);  // Add work experience
    formData.append("amount", amount);  // Add the amount (per day)
    formData.append("description", description);  // Add description
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

  // Function to reset form fields after submission
  function resetForm() {
    setUserName("");  // Reset username
    setPassword("");  // Reset password
    setFullName("");  // Reset full name
    setAge("");  // Reset age
    setAddress("");  // Reset address
    setContactNumber("");  // Reset contact number
    setGender("Male");  // Reset gender
    setNicNumber("");  // Reset NIC number
    setEmail("");  // Reset email
    setWorkExperience("");  // Reset work experience
    setAmount("");  // Reset amount
    setDescription("");  // Reset description
    setImage(null);  // Reset image
  }

  return (
    <div className="container p-4 bg-white rounded shadow-sm" style={{ width: "100%", marginTop: "40px" }}>
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
          {/* Username and Password Fields */}
          <div className="form-group col-md-6">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              required
              placeholder="Enter Username"
              value={userName} // Controlled input
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              placeholder="Enter Password"
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tourguide Fields */}
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
  );
}

export default AddTourguide;
