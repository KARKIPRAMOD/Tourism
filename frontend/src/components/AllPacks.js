import React, { Component } from "react";
import axios from "axios";
import WhatsAppContact from "./WhatsAppContact"; // Assuming this is a component you want to include
import { Link, useHistory, useLocation, Switch, Route } from "react-router-dom";

export default class AllPacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      userRole: localStorage.getItem("userRole") || "guest",
      isAuthorized: false,
    };
  }

  componentDidMount() {
    // Check if user is authorized (admin or tour manager)
    const userRole = localStorage.getItem("userRole");
    const isAuthorized = userRole === "admin" || userRole === "tourmanager";

    this.setState({ isAuthorized }, () => {
      if (this.state.isAuthorized) {
        this.retrievePackages();
      } else {
        // Redirect unauthorized users
        window.location.href = "/user/login";
      }
    });
  }

  // Function to fetch the packages from the API
  retrievePackages() {
    axios
      .get("http://localhost:8070/package/all")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            packages: res.data.existingPackages,
          });
          console.log(this.state.packages);
        } else {
          console.log("Failed to fetch packages");
        }
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }

  // Function to delete a package
  onDelete(id) {
    fetch(`http://localhost:8070/package/delete/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        alert("Deleted Successfully");
        this.retrievePackages(); // Refresh the list after deletion.
      });
    });
  }

  // Function to filter the packages based on search term
  filterContent(packages, searchTerm) {
    const results = packages.filter((pkg) =>
      pkg.packId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ packages: results });
    console.log("Filtered Packages:", results);
  }

  // Function to handle text input for search
  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios
      .get("http://localhost:8070/package/all")
      .then((res) => {
        if (res.data.success) {
          this.filterContent(res.data.existingPackages, searchTerm);
        }
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
  };

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

    return (
      <div className="container bg-white text-black p-3 mb-2">
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
        <div className="row">
          <h2 className="text-center">
            <strong>Manage Package Details</strong>
          </h2>
          <div className="col-lg-9 mt-2 mb-2"></div>
          <div className="col-lg-3 mt-2 mb-2 text-center">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchTerm"
              onChange={this.handleTextSearch}
            />
          </div>
          <table className="table table-hover" style={{ marginTop: "40px" }}>
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Pack_Name</th>
                <th scope="col">Pack_ID</th>
                <th scope="col">Destination</th>
                <th scope="col">Num_Of_Days</th>
                <th scope="col">Num_Of_Passengers</th>
                <th scope="col">Hotel/Other</th>
                <th scope="col">Transport</th>
                <th scope="col">Tourguide</th>
                <th scope="col">Total_Price(Rs)</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.packages.length > 0 ? (
                this.state.packages.map((pkg, index) => (
                  <tr key={pkg._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{pkg.packName}</td>{" "}
                    {/* Changed from pkg.packName to pkg.name */}
                    <td>{pkg.packID}</td>{" "}
                    {/* Changed from pkg.packID to pkg.packId */}
                    <td>{pkg.Destination}</td>{" "}
                    {/* Changed from pkg.Destination to pkg.destination */}
                    <td>{pkg.NumOfDays}</td>{" "}
                    {/* Changed from pkg.NumOfDays to pkg.numofdays */}
                    <td>{pkg.NumOfPassen}</td>{" "}
                    {/* Changed from pkg.NumOfPassen to pkg.numofpassengers */}
                    <td>{pkg.Hotel}</td>{" "}
                    {/* Changed from pkg.Hotel to pkg.hotel */}
                    <td>{pkg.Transport}</td>{" "}
                    {/* Changed from pkg.Transport to pkg.transport */}
                    <td>{pkg.TourGuide}</td>{" "}
                    {/* Changed from pkg.TourGuide to pkg.tourguide */}
                    <td>{pkg.TotPrice}</td>{" "}
                    {/* Changed from pkg.TotPrice to pkg.totalprice */}
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => this.onDelete(pkg._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    No packages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* WhatsApp Contact */}
      </div>
    );
  }
}
