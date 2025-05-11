import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css"; // Assuming you have this stylesheet

// Logout handler
const handleLogout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  window.location = "/home";
};

export default class AllPacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],  // Array to hold the package data
      searchQuery: "",  // Search query to filter packages
      isAuthorized: false,  // Authorization flag
    };
  }

  // Run when the component is mounted
  componentDidMount() {
    const userRole = localStorage.getItem("userRole");
    const isAuthorized = userRole === "admin" || userRole === "tourmanager";
    this.setState({ isAuthorized }, () => {
      if (this.state.isAuthorized) {
        this.retrievePackages(); // Fetch packages if authorized
      } else {
        window.location.href = "/user/login";  // Redirect to login if not authorized
      }
    });
  }

  // Fetch packages from the backend
 retrievePackages() {
  axios
    .get("http://localhost:8070/package/all")
    .then((res) => {
      console.log(res.data); // Check the structure of the response
      if (res.data.success) {
        this.setState({
          packages: res.data.existingPackages || [], // Adjust this line if needed
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching packages:", error);
    });
}


  // Handle search input and filter packages based on packName
  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    this.setState({ searchQuery: searchTerm });
  };

  // Handle deleting a package
  onDelete(id) {
    axios
      .delete(`http://localhost:8070/package/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        this.retrievePackages(); // Refresh the list of packages
      })
      .catch((err) => {
        console.error("Error deleting package:", err);
      });
  }

  // Render the component
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

    // Filter packages based on the search query
    const filteredPackages = this.state.packages.filter((pkg) =>
      pkg.packName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
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

          {/* Package Table */}
          <div className="col-md-9 col-lg-10 ms-auto" style={{ marginLeft: "240px" }}>
            <main className={styles.Main1}>
              <h2 className="mb-4 text-center">All Package Details</h2>

              {/* Filter and Search Row */}
              <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ maxWidth: "300px" }}
                  placeholder="Search for a package"
                  value={this.state.searchQuery}  // Controlled input value
                  onChange={this.handleTextSearch}  // Handling onChange
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
                      <th>Package Name</th>
                      <th>Package ID</th>
                      <th>Destination</th>
                      <th>Days</th>
                      <th>Passengers</th>
                      <th>Hotel</th>
                      <th>Transport</th>
                      <th>Tour Guide</th>
                      <th>Total Price (Rs)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPackages.length > 0 ? (
                      filteredPackages.map((pkg, index) => (
                        <tr key={pkg._id}>
                          <td>{index + 1}</td>
                          <td>{pkg.packName}</td>
                          <td>{pkg.packID}</td>
                          <td>{pkg.Destination}</td>
                          <td>{pkg.NumOfDays}</td>
                          <td>{pkg.NumOfPassen}</td>
                          <td>{pkg.Hotel}</td>
                          <td>{pkg.Transport}</td>
                          <td>{pkg.TourGuide}</td>
                          <td>{pkg.TotPrice}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => this.onDelete(pkg._id)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No packages found.
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
