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
      <div className={styles.sidebar}>
        <div className={styles.logo_content}>
          <div className={styles.logo}>
            <i className={styles.logo1}>
              <GiDetour />
            </i>
            <div className={styles.logo_name}>Travelo</div>
          </div>
          <i className={styles.logo2} id="btn">
            <BiMenu />
          </i>
        </div>

        <div className={styles.nav_list}>
          <li className={styles.list}>
            <Link to="/add/hotel" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <FaBuilding />
              </i>
              <span className={styles.links_name}>Add Hotel Details</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link to="/all/hotel" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <FaExternalLinkAlt />
              </i>
              <span className={styles.links_name}>All Hotel Details</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link to="/update/hotel/:id" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <GrUpdate />
              </i>
              <span className={styles.links_name}>Update Hotel Details</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link to="/print/hotel" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <ImPrinter />
              </i>
              <span className={styles.links_name}>Print Hotel Details</span>
            </Link>
          </li>

          <div className={styles.panel_content}>
            <div className={styles.panel}>
              <div className={styles.name_panel}>
                <div className={styles.name}>User Panel</div>
              </div>
            </div>
            <Link to="/view/hotel" type="submit">
              <span className={styles.user_icon}>
                <BiLogOut />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <main className={styles.Main1}>
          <section className={styles.recent}>
            <div className={styles.activityCard}>
              <h3>Add Hotel Details</h3>
              <div className={styles.container}>
                <form className={styles.form1} onSubmit={sendData}>
                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      value={name}
                      style={{ height: "50px" }}
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
