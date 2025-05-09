import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AllPacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      searchQuery: "",
      userRole: localStorage.getItem("userRole") || "guest",
      isAuthorized: false,
    };
  }

  componentDidMount() {
    const userRole = localStorage.getItem("userRole");
    const isAuthorized = userRole === "admin" || userRole === "tourmanager";
    this.setState({ isAuthorized }, () => {
      if (this.state.isAuthorized) {
        this.retrievePackages();
      } else {
        window.location.href = "/user/login";
      }
    });
  }

  retrievePackages() {
    axios
      .get("http://localhost:8070/package/all")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            packages: res.data.existingPackages,
          });
        } else {
          console.log("Failed to fetch packages");
        }
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios
      .get("http://localhost:8070/package/all")
      .then((res) => {
        if (res.data.success) {
          const filteredPackages = res.data.existingPackages.filter((pkg) =>
            pkg.packId.toLowerCase().includes(searchTerm.toLowerCase())
          );
          this.setState({ packages: filteredPackages });
        }
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
  };

  onDelete(id) {
    fetch(`http://localhost:8070/package/delete/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        alert("Deleted Successfully");
        this.retrievePackages();
      });
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

    return (
      <div className="container-fluid bg-white text-black p-0 m-0">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div
          className="ms-auto"
          style={{
            marginLeft: "240px",
            padding: "20px",
            width: "calc(100% - 240px)",
            boxSizing: "border-box",
          }}
        >
          <main className="mt-5">
            <h2 className="text-center">
              <strong>Manage Package Details</strong>
            </h2>

            {/* Search and Filter */}
            <div className="d-flex justify-content-between align-items-center mb-3 px-3">
              <input
                className="form-control w-50"
                type="search"
                placeholder="Search"
                value={this.state.searchQuery}
                onChange={this.handleTextSearch}
              />
              <div className="d-flex gap-2">
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
              </div>
            </div>

            {/* Package Table */}
            <div className="table-responsive">
              <table
                className="table table-hover"
                style={{ marginTop: "40px", tableLayout: "auto" }}
              >
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Count</th>
                    <th scope="col">Pack Name</th>
                    <th scope="col">Pack ID</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Days</th>
                    <th scope="col">Passengers</th>
                    <th scope="col">Hotel/Other</th>
                    <th scope="col">Transport</th>
                    <th scope="col">Tourguide</th>
                    <th scope="col">Total Price (Rs)</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.packages.length > 0 ? (
                    this.state.packages.map((pkg, index) => (
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
          </main>
        </div>
      </div>
    );
  }
}
