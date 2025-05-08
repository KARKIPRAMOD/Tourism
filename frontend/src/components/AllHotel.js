import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css";

import addImg from "../img/addImg.svg";
import { BiMenu, BiLogOut } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { FaHotel } from "react-icons/fa";

import { RiAdminFill } from "react-icons/ri";

import { MdFamilyRestroom } from "react-icons/md";

import { GiCarKey, GiDetour } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { ImPrinter } from "react-icons/im";
import { FaExternalLinkAlt } from "react-icons/fa";
import photo from "../img/proflie.png";

export default class AllHotel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotels: [],
    };
  }
  componentDidMount() {
    this.retriveHotels();
  }
  retriveHotels() {
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        this.setState({
          hotels: res.data.existingHotels,
        });

        console.log(this.state.hotels);
      }
    });
  }

  onDelete(id) {
    fetch(`http://localhost:8070/hotel/delete/${id}`, {
      method: `DELETE`,
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        alert("Deleted Succsessfull");
        this.retriveHotels();
      });
    });
  }

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.mainContent}>
          {/* sidebar */}
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
          {/* main box */}
          <main className={styles.Main1}>
            <h2>Over View</h2>
            <div className={styles.dashboardCard}>
              <div className={styles.cardSingle}>
                <div className={styles.cardBody}>
                  <span className={styles.boxicon}>
                    <Link to="/add/hotel" className={styles.sidelinks}>
                      <i className={styles.logo3}>
                        <FaBuilding />
                      </i>
                      <span className={styles.links_name}>
                        Add Hotel Details
                      </span>
                    </Link>
                  </span>
                </div>
              </div>

              <div className={styles.cardSingle}>
                <div className={styles.cardBody}>
                  <span className={styles.boxicon}>
                    <Link to="/print/hotel" className={styles.sidelinks}>
                      <i className={styles.logo3}>
                        <ImPrinter />
                      </i>
                      <span className={styles.links_name}>
                        Print Hotel Details
                      </span>
                    </Link>
                  </span>
                </div>
              </div>

              <div className={styles.cardSingle}>
                <div className={styles.cardBody}>
                  <span className={styles.boxicon}>
                    <GiCarKey />
                  </span>
                  <div className={styles.cardname}>
                    <h5>Avalable Rooms</h5>
                    <h4>516</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* table */}
            <div class={`text-center ${styles.table_responsive}`}>
              <font
                face="Comic sans MS"
                size="6"
                class="pb-1  "
                style={{ fontFamily: "sans-serif" }}
              >
                {" "}
                <strong>All hotels Details </strong>{" "}
              </font>

              <section
                class="p-3"
                style={{ backgroundColor: "#fff", width: "1500px" }}
              >
                <div className="table-responsive">
                  <table className={styles.content_table}>
                    <thead className={styles.dark}>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Hotel Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price</th>
                        <th scope="col">No Of Rooms</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.hotels.map((hotels, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{hotels.name}</td>
                          <td>{hotels.type}</td>
                          <td>{hotels.location}</td>
                          <td>{hotels.price}</td>
                          <td>{hotels.no_of_rooms}</td>

                          <td>
                            <Link
                              to={`/update/hotel/${hotels._id}`}
                              className={styles.btn_table}
                            >
                              Update
                            </Link>
                          </td>
                          <td>
                            <button
                              class={styles.btn_table1}
                              onClick={() => this.onDelete(hotels._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
