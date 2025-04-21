import React, { useState } from "react";
import axios from "axios";

const token = localStorage.getItem("token"); // This should return a valid token

function AddTourguide() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("Male"); // Set default value here
  const [nicNumber, setNicNumber] = useState("");
  const [eMail, setEmail] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // sendData function
  function sendData(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation before sending the request
    if (
      !fullName ||
      !age ||
      !address ||
      !dateOfBirth ||
      !contactNumber ||
      !gender ||
      !nicNumber ||
      !eMail ||
      !workExperience ||
      !amount
    ) {
      setIsLoading(false);
      setError("All fields are required.");
      alert("All fields are required.");
      return;
    }

    // Convert age and amount to appropriate types
    const newTourguide = {
      fullName,
      age: parseInt(age, 10),
      address,
      dateOfBirth,
      contactNumber,
      gender,
      nicNumber,
      eMail,
      workExperience,
      amount: parseFloat(amount),
    };

    // Add data to the database via the backend
    axios
      .post("http://localhost:8070/tourguide/add", newTourguide, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure "Bearer " prefix is added
        },
      })
      .then(() => {
        alert("Tourguide Added");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error adding tourguide:", err);
        if (err.response) {
          console.log("Response data:", err.response.data);
        }
        if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") {
          setError(
            "Cannot connect to the server. Please make sure the backend server is running."
          );
          alert(
            "Connection Error: Cannot connect to the server. Please make sure the backend server is running."
          );
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while adding the tourguide."
          );
          alert(
            err.response?.data?.message ||
              "An error occurred while adding the tourguide."
          );
        }
      });
  }

  return (
    <div
      className="container p-3 mb-2 bg-white text-black"
      style={{ marginTop: "40px", borderRadius: "10px" }}
    >
      <form onSubmit={sendData}>
        <div className="text-center">
          <h2>
            <strong>Add Tourguide Details</strong>
          </h2>
        </div>
        <hr />
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="row">
          {/* Form Fields */}
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
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="age" className="form-label text-black">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              required
              placeholder="Enter Tourguide Age"
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
              placeholder="Enter Tourguide Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="dateOfBirth" className="form-label text-black">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              required
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="contactNumber" className="form-label text-black">
              Contact Number
            </label>
            <input
              type="number"
              className="form-control"
              id="contactNumber"
              required
              placeholder="Enter Tourguide Contact Number"
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="gender" className="form-label text-black">
              Gender
            </label>
            <select
              id="gender"
              className="form-control"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
              placeholder="Enter Tourguide NIC Number"
              onChange={(e) => setNicNumber(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="eMail" className="form-label text-black">
              E mail
            </label>
            <input
              type="email"
              className="form-control"
              id="eMail"
              placeholder="Enter Tourguide Email"
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
              placeholder="Enter Tourguide Work Experience"
              onChange={(e) => setWorkExperience(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="amount" className="form-label text-black">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter Tourguide expected Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginTop: "20px",
            width: "300px",
            marginRight: "300px",
            marginLeft: "200px",
            borderRadius: "20px",
          }}
          disabled={isLoading}
        >
          <strong>{isLoading ? "Submitting..." : "Submit"}</strong>
        </button>

        <a
          href="/guidereport"
          className="btn btn-primary"
          style={{
            marginTop: "20px",
            width: "300px",
            marginLeft: "-20px",
            color: "white",
            marginRight: "10px",
            borderRadius: "20px",
          }}
        >
          <strong>Get All Tourguides</strong>
        </a>
      </form>
    </div>
  );
}

export default AddTourguide;
