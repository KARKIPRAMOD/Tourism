import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa"; // Icon for the image upload
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

function AddPackage() {
  const [packName, setName] = useState("");
  const [packID, setPid] = useState("");
  const [Destination, setDesti] = useState("");
  const [NumOfDays, setDays] = useState("");
  const [NumOfPassen, setPass] = useState("");
  const [Hotel, setHotel] = useState("");
  const [Transport, setTrans] = useState("");
  const [TourGuide, setGuide] = useState("");
  const [TotPrice, setPrice] = useState("");
  const [images, setImages] = useState([]); // Change state to handle multiple images
  const [description, setDescription] = useState(""); // Change state to handle multiple images

  const handleLogout = () => {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      window.location = "/home";
  };
  function handleImageChange(e) {
    setImages(e.target.files); // Store all selected files in the state
  }

  function sendData(e) {
    e.preventDefault();

    const newPackage = {
      packName,
      packID,
      Destination,
      NumOfDays,
      NumOfPassen,
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      description
    };
 
    const formData = new FormData();
    formData.append("packName", packName);
    formData.append("packID", packID);
    formData.append("Destination", Destination);
    formData.append("NumOfDays", NumOfDays);
    formData.append("NumOfPassen", NumOfPassen);
    formData.append("Hotel", Hotel);
    formData.append("Transport", Transport);
    formData.append("TourGuide", TourGuide);
    formData.append("TotPrice", TotPrice);
    formData.append("description", description);


    // Append all selected images to formData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios
      .post("http://localhost:8070/package/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Package Added");
      })
      .catch((err) => {
        alert(err);
      });
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
          marginLeft: "250px", // Adjust the left margin to shift content to the right
          width: "calc(100% - 250px)", // Take up the remaining space next to the sidebar
        }}
      >
        <form onSubmit={sendData}>
          <div className="text-center mb-4">
            <h2 className="font-weight-bold">Add Tour Package Details</h2>
            <p className="text-muted">
              Fill in the details for the new tour package
            </p>
          </div>

          <div className="row">
            {/* Left Side Form Fields */}
            <div className="form-group col-md-6">
              <label htmlFor="packName" className="font-weight-bold">
                Package Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="packName"
                placeholder="Enter package name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="packID" className="font-weight-bold">
                Package ID *
              </label>
              <input
                type="text"
                className="form-control"
                id="packID"
                placeholder="Enter package ID"
                onChange={(e) => setPid(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Destination" className="font-weight-bold">
                Destination *
              </label>
              <input
                type="text"
                className="form-control"
                id="Destination"
                placeholder="Enter destination"
                onChange={(e) => setDesti(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="NumOfDays" className="font-weight-bold">
                Number of Days *
              </label>
              <input
                type="number"
                className="form-control"
                id="NumOfDays"
                placeholder="Enter number of days"
                onChange={(e) => setDays(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="NumOfPassen" className="font-weight-bold">
                Number of Passengers *
              </label>
              <input
                type="number"
                className="form-control"
                id="NumOfPassen"
                placeholder="Enter number of passengers"
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Right Side Form Fields */}
            <div className="form-group col-md-6">
              <label htmlFor="Hotel" className="font-weight-bold">
                Hotel Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="hotel"
                placeholder="Enter hotel name"
                onChange={(e) => setHotel(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Transport" className="font-weight-bold">
                Transport Mode *
              </label>
              <input
                type="text"
                className="form-control"
                id="transport"
                placeholder="Enter transport type"
                onChange={(e) => setTrans(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="TourGuide" className="font-weight-bold">
                Tour Guide *
              </label>
              <input
                type="text"
                className="form-control"
                id="tourGuide"
                placeholder="Enter tour guide name"
                onChange={(e) => setGuide(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="TotPrice" className="font-weight-bold">
                Total Price *
              </label>
              <input
                type="number"
                className="form-control"
                id="TotPrice"
                placeholder="Enter total price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="TotPrice" className="font-weight-bold">
               Description
              </label>
              <input
                type="string"
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Image Upload Field */}
          <div className="form-group">
            <label htmlFor="images" className="font-weight-bold">
              Package Images *
            </label>
            <input
              type="file"
              name="images"
              multiple
              className="form-control"
              onChange={handleImageChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success mt-4"
            style={{ width: "100%" }}
          >
            <strong>Submit</strong>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPackage;
