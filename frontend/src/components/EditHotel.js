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
          // Note: not setting photos or roomTypes since not editable here
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    // Basic validation
    if (!name || !type || !location || !noOfRooms || !map) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate noOfRooms as positive integer
    const roomsNumber = Number(noOfRooms);
    if (!Number.isInteger(roomsNumber) || roomsNumber <= 0) {
      alert("Please enter a valid number of rooms (positive integer).");
      return;
    }

    // Validate map as a URL (basic check)
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
        const errorMessage =
          err.response?.data?.message || "Database Error. Please try again.";
        alert(errorMessage);
      });
  }

  return (
    <div className={styles.body}>
      <div className={styles.mainContent}>
        <main className={styles.Main1}>
          <section className={styles.recent}>
            <div className={styles.activityCard}>
              <h3>Update Hotel Details</h3>
              <div className={styles.container}>
                <form className={styles.form1} onSubmit={updateData}>
                  {/* Hotel Name */}
                  <div className={`form-group text-left ${styles.input}`}>
                    <label htmlFor="name" className="form-label">
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

                  {/* Hotel Type */}
                  <div className={`form-group text-left ${styles.input}`}>
                    <label htmlFor="type" className="form-label">
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

                  {/* Location */}
                  <div className={`form-group text-left ${styles.input}`}>
                    <label htmlFor="location" className="form-label">
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

                  {/* Number of Rooms */}
                  <div className={`form-group text-left ${styles.input}`}>
                    <label htmlFor="no_of_rooms" className="form-label">
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

                  {/* Map URL */}
                  <div className={`form-group text-left ${styles.input}`}>
                    <label htmlFor="map" className="form-label">
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
                  </div>

                  {/* Buttons */}
                  <div className={`form-group text-left ${styles.input1}`}>
                    <button type="submit" className={styles.subBtn}>
                      Update Hotel Details
                    </button>
                    &nbsp;&nbsp;
                    <Link to="/all/hotel" className="btn btn-secondary">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
