import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css";

const handleLogout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  window.location = "/home";
};

export default class AllHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      searchQuery: "",
      sortKey: "",
    };
  }

  componentDidMount() {
    this.retriveHotels();
  }

  retriveHotels() {
    axios.get("http://localhost:8070/hotel/all").then((res) => {
      if (res.data.success) {
        this.setState({ hotels: res.data.existingHotels });
      }
    });
  }

  // Soft delete: remove hotel from state only (frontend)
  softDeleteHotel = (id) => {
    this.setState((prevState) => ({
      hotels: prevState.hotels.filter((hotel) => hotel._id !== id),
    }));
  };

  render() {
    const { hotels, searchQuery } = this.state;
    const filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className={styles.body}>
        <div className="row">
          {/* Sidebar - unchanged */}
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

          {/* Hotels Table */}
          <div
            className="col-md-9 col-lg-10 ms-auto"
            style={{ marginLeft: "240px" }}
          >
            <main className={styles.Main1}>
              <h2 className="mb-4 text-center">All Hotel Details</h2>

              {/* Filter and Search Row */}
              <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ maxWidth: "300px" }}
                  placeholder="Search a hotel"
                  value={searchQuery}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  }
                />
                <div className="d-flex align-items-center gap-2">
                  <select className="form-select">
                    <option>Filter by</option>
                    <option>Type</option>
                    <option>Location</option>
                  </select>
                  <select className="form-select">
                    <option>Sort by</option>
                    <option>Name</option>
                    <option>Price</option>
                    <option>Rooms</option>
                  </select>
                  <button className="btn btn-outline-secondary">
                    <i className="bi bi-sliders"></i>
                  </button>
                </div>
              </div>

              <div className="table-responsive px-3">
                <table className="table align-middle">
                  <thead
                    style={{
                      backgroundColor: "#f5f6fa",
                      color: "purple",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    <tr>
                      <th>S.N.</th>
                      <th>Hotel Name</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Price</th>
                      <th>Rooms</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHotels.length > 0 ? (
                      filteredHotels.map((hotel, index) => (
                        <tr
                          key={hotel._id}
                          style={{
                            backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <strong>{hotel.name}</strong>
                          </td>
                          <td>{hotel.type}</td>
                          <td>{hotel.location}</td>
                          <td>${hotel.price}</td>
                          <td>{hotel.no_of_rooms} rooms</td>
                          <td>
                            <Link
                              to={`/update/hotel/${hotel._id}`}
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={() => this.softDeleteHotel(hotel._id)}
                              className="btn btn-outline-warning btn-sm"
                            >
                              <i className="bi bi-x-circle"></i> Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No hotels found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
