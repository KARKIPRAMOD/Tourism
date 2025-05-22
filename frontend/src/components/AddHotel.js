import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css";

export default function AddHotel() {
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [location, setlocation] = useState(""); 
  const [no_of_rooms, setno_of_rooms] = useState("");
  const [description, setdescription] = useState("");
  const [map, SetMap] = useState(""); 
  const [photos, setPhotos] = useState([]);

  const [roomTypes, setRoomTypes] = useState([
    { roomType: "Normal", price: "" },
    { roomType: "AC", price: "" },
    { roomType: "Deluxe", price: "" },
    { roomType: "VIP Suite", price: "" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location = "/home";
  };

  // Update room price values
  const handleRoomTypeChange = (index, field, value) => {
    const updated = [...roomTypes];
    updated[index][field] = value;
    setRoomTypes(updated);
  };

  // Function to extract src URL from iframe string (if user pastes full iframe tag)
  function extractSrcFromIframe(input) {
    const regex = /src="([^"]+)"/;
    const match = input.match(regex);
    return match ? match[1] : input;
  }

  function sendData(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("map", map); // cleaned embed URL string
    formData.append("no_of_rooms", no_of_rooms);
    formData.append("description", description);
    formData.append("roomTypes", JSON.stringify(roomTypes));

    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    axios
      .post("http://localhost:8070/hotel/add", formData)
      .then(() => {
        alert("Hotel added successfully");
        setname("");
        settype("");
        setlocation("");
        SetMap("");
        setno_of_rooms("");
        setdescription("");
        setPhotos([]);
        setRoomTypes([
          { roomType: "Normal", price: "" },
          { roomType: "AC", price: "" },
          { roomType: "Deluxe", price: "" },
          { roomType: "VIP Suite", price: "" },
        ]);
      })
      .catch((err) => alert("Error adding hotel: " + err.message));
  }

  return (
    <div className={styles.body}>
      {/* Sidebar */}
      <div className="col-md-3 col-lg-2">
        <div
          className="sidebar"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "240px",
            backgroundColor: "#2c2c54",
            zIndex: 1000,
            borderRight: "2px solid #ddd",
            paddingTop: "20px",
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
                to="/all/tourguides"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-person-lines-fill me-2"></i> Tour Guides
              </Link>
            </li>
            <li>
              <Link
                to="/all/hotel"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-building me-2"></i> Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/manage/AllPacks"
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
      </div>

      {/* Main Content */}
      <div className="col-md-9 col-lg-10 offset-md-3 offset-lg-2">
        <div className="container mt-5">
          <h2
            className="mb-4"
            style={{ color: "#2c2c54", fontWeight: "bold", fontSize: "40px" }}
          >
            Add Hotel Details
          </h2>
          <form
            onSubmit={sendData}
            className="border rounded p-4 shadow-sm bg-white"
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  Hotel Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  Hotel Type*
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  Location*
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                  title="Paste Google Maps embed URL or iframe code here"
                >
                  Location URL (Google Maps embed)*
                </label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  value={map}
                  onChange={(e) => {
                    const extractedUrl = extractSrcFromIframe(e.target.value);
                    SetMap(extractedUrl);
                  }}
                  required
                />
                {map && (
                  <small className="text-muted mt-1 d-block">
                    <a href={map} target="_blank" rel="noopener noreferrer">
                      View Location on Google Maps
                    </a>
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  No. of Rooms*
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={no_of_rooms}
                  onChange={(e) => setno_of_rooms(e.target.value)}
                  required
                />
              </div>

              {/* Room Types with prices */}
              <div className="col-12">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  Room Types & Prices (NRP)*
                </label>
                {roomTypes.map((room, idx) => (
                  <div className="d-flex gap-3 mb-2" key={idx}>
                    <input
                      type="text"
                      className="form-control"
                      value={room.roomType}
                      disabled
                      style={{ maxWidth: "200px" }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={room.price}
                      onChange={(e) =>
                        handleRoomTypeChange(idx, "price", e.target.value)
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  Upload Photos
                </label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) => setPhotos(e.target.files)}
                />
              </div>

              <div className="col-12">
                <label
                  className="form-label"
                  style={{ color: "purple", fontWeight: "bold", fontSize: "20px" }}
                >
                  Hotel Description
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontSize: "15px" }}
              >
                Save Hotel
              </button>
              <button
                type="reset"
                className="btn btn-outline-danger"
                style={{ fontSize: "15px" }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function extractSrcFromIframe(input) {
    const regex = /src="([^"]+)"/;
    const match = input.match(regex);
    return match ? match[1] : input;
  }
}
