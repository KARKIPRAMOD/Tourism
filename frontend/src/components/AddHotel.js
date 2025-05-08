import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../style_sheets/Add.module.css";
import addImg from "../img/addImg.svg";

import { BiMenu, BiLogOut } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { FaHotel, FaBuilding, FaExternalLinkAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdFamilyRestroom, MdMargin } from "react-icons/md";
import { GiCarKey, GiDetour } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { ImPrinter } from "react-icons/im";
import photo from "../img/proflie.png";

export default function AddHotel() {
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [location, setlocation] = useState("");
  const [price, setprice] = useState("");
  const [no_of_rooms, setno_of_rooms] = useState("");
  const [description, setdescription] = useState("");

  const [photos, setPhotos] = useState([]);

  function sendData(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("no_of_rooms", no_of_rooms);
    formData.append("description", description);

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
        setprice("");
        setno_of_rooms("");
        setPhotos([]);
        setdescription("");
      })
      .catch((err) => {
        alert("Error adding hotel: " + err.message);
      });
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

          {/* Logout Button */}
          <div className="mt-auto">
            <Link
              to="/home"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <main className={styles.Main1}>
          <section className={styles.recent}>
            <div className={styles.activityCard}>
              <div className={styles.container}>
                <form className={styles.form1} onSubmit={sendData}>
                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      placeholder="Enter name"
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      value={type}
                      style={{ height: "50px" }}
                      className="form-control"
                      placeholder="Enter Hotel Type"
                      onChange={(e) => settype(e.target.value)}
                      required
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      value={location}
                      style={{ height: "50px" }}
                      className="form-control"
                      placeholder="Enter Location"
                      onChange={(e) => setlocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="number"
                      value={price}
                      style={{ height: "50px" }}
                      className="form-control"
                      placeholder="Enter Price"
                      onChange={(e) => setprice(e.target.value)}
                      required
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="number"
                      value={no_of_rooms}
                      style={{ height: "50px" }}
                      className="form-control"
                      placeholder="Enter No. of Rooms"
                      onChange={(e) => setno_of_rooms(e.target.value)}
                      required
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <textarea
                      value={description}
                      rows="3"
                      className="form-control"
                      placeholder="Enter Description"
                      onChange={(e) => setdescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="file"
                      multiple
                      className="form-control"
                      onChange={(e) => setPhotos(e.target.files)}
                    />
                  </div>

                  <button type="submit" className={styles.subBtn}>
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className={styles.summary1}>
              <img
                src={addImg}
                alt="Add illustration"
                className={styles.addImg}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
