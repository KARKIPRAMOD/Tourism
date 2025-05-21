import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from "../style_sheets/Add.module.css";

export default function EditHotel() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [map, setMap] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:8070/hotel/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result.hotel) {
          setName(result.hotel.name || "");
          setType(result.hotel.type || "");
          setLocation(result.hotel.location || "");
          setNoOfRooms(result.hotel.no_of_rooms || "");
          setMap(result.hotel.map || "");
        }
      })
      .catch((err) => console.error("Fetch error:", err));
    return () => {
      isMounted = false;
    };
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (!name || !type || !location || !noOfRooms || !map) {
      alert("Please fill in all required fields.");
      return;
    }

    const roomsNumber = Number(noOfRooms);
    if (!Number.isInteger(roomsNumber) || roomsNumber <= 0) {
      alert("Please enter a valid number of rooms (positive integer).");
      return;
    }

    try {
      new URL(map);
    } catch {
      alert("Please enter a valid URL for the Map field.");
      return;
    }

    const updateHotel = {
      name,
      type,
      location,
      no_of_rooms: roomsNumber,
      map,
    };

    axios
      .put(`http://localhost:8070/hotel/update/${id}`, updateHotel)
      .then((response) => {
        if (response.status === 200) {
          alert("Hotel Updated Successfully!");
          history.push("/all/hotel");
        } else {
          alert("Update failed. Please try again later.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert(err.response?.data?.message || "Database Error. Please try again.");
      });
  }

  return (
    <div className={`container ${styles.body} py-5`}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className={`card shadow-sm ${styles.activityCard}`}>
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Update Hotel Details</h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateData} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Hotel Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter Hotel Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label fw-semibold">
                    Hotel Type <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="type"
                    className="form-control"
                    placeholder="Enter Hotel Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label fw-semibold">
                    Location <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="form-control"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="no_of_rooms" className="form-label fw-semibold">
                    Number of Rooms <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="no_of_rooms"
                    className="form-control"
                    placeholder="Enter Number of Rooms"
                    value={noOfRooms}
                    onChange={(e) => setNoOfRooms(e.target.value)}
                    min="1"
                    step="1"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="map" className="form-label fw-semibold">
                    Map URL (Bing Maps) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="url"
                    id="map"
                    className="form-control"
                    placeholder="Enter Bing Maps URL"
                    value={map}
                    onChange={(e) => setMap(e.target.value)}
                    required
                  />
                  {map && (
                    <small className="text-muted">
                      <a href={map} target="_blank" rel="noopener noreferrer">
                        View Location on Map
                      </a>
                    </small>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <button type="submit" className="btn btn-primary px-4">
                    Update
                  </button>
                  <Link to="/all/hotel" className="btn btn-secondary px-4">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
