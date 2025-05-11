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

export default class AllTourGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourguides: [],
      searchQuery: "",
      isAuthorized: false,
    };
  }

  componentDidMount() {
    const userRole = localStorage.getItem("userRole");
    const isAuthorized = userRole === "admin" || userRole === "tourmanager";
    this.setState({ isAuthorized }, () => {
      if (this.state.isAuthorized) {
        this.retrieveTourGuides();
      } else {
        window.location.href = "/user/login";
      }
    });
  }

retrieveTourGuides() {
  axios
    .get("http://localhost:8070/tourguide/all")
    .then((res) => {
      if (res.data.success) {
        this.setState({ tourguides: res.data.guides }); // Changed 'tourguides' to 'guides'
      }
    })
    .catch((error) => {
      console.error("Error fetching tour guides:", error);
    });
}



  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    this.setState({ searchQuery: searchTerm });
  };

  onDelete(id) {
    axios
      .delete(`http://localhost:8070/tourguide/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        this.retrieveTourGuides();
      })
      .catch((err) => {
        console.error("Error deleting tour guide:", err);
      });
  }

  render() {
    if (!this.state.isAuthorized) {
      return (
        <div className="container mt-5 text-center">
          <h2>Access Denied</h2>
          <p>
            You must be logged in as an administrator or tour manager to access
            this page.
          </p>
          <a href="/user/login" className="btn btn-primary">
            Login
          </a>
        </div>
      );
    }

    const filteredTourGuides = this.state.tourguides.filter((tourguide) =>
      tourguide.fullName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    return (
      <div className={styles.body}>
        <div className="row">
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

          {/* Tour Guide Table */}
          <div className="col-md-9 col-lg-10 ms-auto" style={{ marginLeft: "240px" }}>
            <main className={styles.Main1}>
              <h2 className="mb-4 text-center">All Tour Guide Details</h2>

              {/* Filter and Search Row */}
              <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ maxWidth: "300px" }}
                  placeholder="Search for a tour guide"
                  value={this.state.searchQuery}
                  onChange={this.handleTextSearch}
                />
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
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Experience</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTourGuides.length > 0 ? (
                      filteredTourGuides.map((tourguide, index) => (
                        <tr key={tourguide._id}>
                          <td>{index + 1}</td>
                          <td>{tourguide.fullName}</td>
                          <td>{tourguide.age}</td>
                          <td>{tourguide.gender}</td>
                          <td>{tourguide.address}</td>
                          <td>{tourguide.contactNumber}</td>
                          <td>{tourguide.eMail}</td>
                          <td>{tourguide.workExperience}</td>
                          <td>{tourguide.amount}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => this.onDelete(tourguide._id)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No tour guides found.
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
