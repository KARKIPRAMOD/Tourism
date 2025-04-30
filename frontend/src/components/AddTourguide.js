import React, { useState } from "react";
import axios from "axios";

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
    <div
      className="container p-3 mb-2 bg-white text-black"
      style={{ marginTop: "40px", borderRadius: "10px" }}
    >
      <form onSubmit={sendData} encType="multipart/form-data">
        <div className="text-center">
          <h2>
            <strong>Add Tourguide Details</strong>
          </h2>
        </div>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="fullName" className="form-label text-black">
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
            <label htmlFor="age" className="form-label text-black">
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
            <label htmlFor="address" className="form-label text-black">
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
            <label htmlFor="contactNumber" className="form-label text-black">
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
            <label htmlFor="gender" className="form-label text-black">
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
            <label htmlFor="nicNumber" className="form-label text-black">
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
            <label htmlFor="eMail" className="form-label text-black">
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
            <label htmlFor="workExperience" className="form-label text-black">
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
            <label htmlFor="amount" className="form-label text-black">
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

          {/* New fields for Description and Image */}
          <div className="form-group col-md-6">
            <label htmlFor="description" className="form-label text-black">
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
            <label htmlFor="image" className="form-label text-black">
              Upload Image
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

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={isLoading}
        >
          <strong>{isLoading ? "Submitting..." : "Submit"}</strong>
        </button>

        <a
          href="/guidereport"
          className="btn btn-primary mt-4 ms-3"
          style={{ color: "white" }}
        >
          <strong>Get All Tourguides</strong>
        </a>
      </form>
    </div>
  );
}

export default AddTourguide;
