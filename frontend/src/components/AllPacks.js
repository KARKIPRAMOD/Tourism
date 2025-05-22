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

export default class AllPacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isAuthorized: false,

      searchQuery: "",
      filterBy: "All",      // "All" | "Destination" | "Days"
      filterValue: "All",   // depends on filterBy selected

      sortBy: "",           // "Name" | "Price" | "Days"
      sortOrder: "asc",

      currentPage: 1,
      packagesPerPage: 10,
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
        const pkgs = Array.isArray(res.data) ? res.data : [];
        this.setState({ packages: pkgs });
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        this.setState({ packages: [] });
      });
  }

  softRemovePackage = (id) => {
    this.setState(
      (prevState) => ({
        packages: prevState.packages.filter((pkg) => pkg._id !== id),
      }),
      () => {
        // Reset page on remove if needed
        if ((this.state.currentPage - 1) * this.state.packagesPerPage >= this.state.packages.length) {
          this.setState({ currentPage: Math.max(this.state.currentPage - 1, 1) });
        }
      }
    );
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value, currentPage: 1 });
  };

  handleFilterByChange = (e) => {
    this.setState({ filterBy: e.target.value, filterValue: "All", currentPage: 1 });
  };

  handleFilterValueChange = (e) => {
    this.setState({ filterValue: e.target.value, currentPage: 1 });
  };

  handleSortByChange = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  toggleSortOrder = () => {
    this.setState((prevState) => ({
      sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  goToPreviousPage = () => {
    this.setState((prevState) => ({
      currentPage: Math.max(prevState.currentPage - 1, 1),
    }));
  };

  goToNextPage = () => {
    this.setState((prevState) => {
      const totalPages = Math.ceil(prevState.filteredPackages.length / prevState.packagesPerPage);
      return { currentPage: Math.min(prevState.currentPage + 1, totalPages) };
    });
  };

  applyFiltersAndSort = () => {
    const {
      packages,
      searchQuery,
      filterBy,
      filterValue,
      sortBy,
      sortOrder,
    } = this.state;

    let filtered = packages;

    // Search by package name
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((pkg) =>
        pkg.packName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by filterBy and filterValue
    if (filterBy !== "All" && filterValue !== "All") {
      if (filterBy === "Destination") {
        filtered = filtered.filter((pkg) => pkg.Destination === filterValue);
      } else if (filterBy === "Days") {
        filtered = filtered.filter(
          (pkg) => pkg.NumOfDays?.toString() === filterValue
        );
      }
    }

    // Sort
    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        let valA, valB;
        switch (sortBy) {
          case "Name":
            valA = a.packName.toLowerCase();
            valB = b.packName.toLowerCase();
            break;
          case "Price":
            valA = a.TotPrice;
            valB = b.TotPrice;
            break;
          case "Days":
            valA = a.NumOfDays;
            valB = b.NumOfDays;
            break;
          default:
            return 0;
        }
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  render() {
    const {
      isAuthorized,
      searchQuery,
      filterBy,
      filterValue,
      sortBy,
      sortOrder,
      packages,
      currentPage,
      packagesPerPage,
    } = this.state;

    if (!isAuthorized) {
      return (
        <div className="container mt-5 text-center">
          <h2>Access Denied</h2>
          <p>You must be logged in as an administrator or tour manager to access this page.</p>
          <a href="/user/login" className="btn btn-primary">Login</a>
        </div>
      );
    }

    // Generate unique filter options dynamically
    const uniqueDestinations = [
      "All",
      ...new Set(packages.map((p) => p.Destination).filter(Boolean)),
    ];
    const uniqueDays = [
      "All",
      ...new Set(packages.map((p) => p.NumOfDays?.toString()).filter(Boolean)),
    ];

    const filteredPackages = this.applyFiltersAndSort();

    // Pagination
    const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
    const startIndex = (currentPage - 1) * packagesPerPage;
    const currentPackages = filteredPackages.slice(startIndex, startIndex + packagesPerPage);

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
                  <Link to="/admin/dashboard" className="d-flex align-items-center text-white px-3 py-2">
                    <i className="bi bi-house-door me-2"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/adminTourguide" className="d-flex align-items-center text-white px-3 py-2">
                    <i className="bi bi-person-lines-fill me-2"></i> Tour Guides
                  </Link>
                </li>
                <li>
                  <Link to="/adminHotel" className="d-flex align-items-center text-white px-3 py-2">
                    <i className="bi bi-building me-2"></i> Hotels
                  </Link>
                </li>
                <li>
                  <Link to="/adminPackage" className="d-flex align-items-center text-white px-3 py-2">
                    <i className="bi bi-card-list me-2"></i> Packages
                  </Link>
                </li>
                <li>
                  <Link to="/all/user" className="d-flex align-items-center text-white px-3 py-2">
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

          {/* Package Table Section */}
          <div className="col-md-9 col-lg-10 ms-auto" style={{ marginLeft: "240px" }}>
            <main className={styles.Main1}>
              <h2 className="mb-4 text-center">All Package Details</h2>

              {/* Filters and Search */}
              <div className="row mb-3 px-3 g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    placeholder="Search by Package Name"
                    className="form-control"
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                  />
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={filterBy}
                    onChange={this.handleFilterByChange}
                  >
                    <option value="All">Filter by</option>
                    <option value="Destination">Destination</option>
                    <option value="Days">Days</option>
                  </select>
                </div>

                {filterBy !== "All" && (
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={filterValue}
                      onChange={this.handleFilterValueChange}
                    >
                      <option value="All">All</option>
                      {filterBy === "Destination" &&
                        uniqueDestinations.map((dest, i) => (
                          <option key={i} value={dest}>
                            {dest}
                          </option>
                        ))}
                      {filterBy === "Days" &&
                        uniqueDays.map((day, i) => (
                          <option key={i} value={day}>
                            {day}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="col-md-12 d-flex justify-content-end">
                  <select
                    className="form-select w-auto"
                    value={sortBy}
                    onChange={this.handleSortByChange}
                    style={{ maxWidth: "200px" }}
                  >
                    <option value="">Sort by</option>
                    <option value="Name">Name</option>
                    <option value="Price">Price</option>
                    <option value="Days">Days</option>
                  </select>

                  {sortBy && (
                    <button
                      className="btn btn-outline-secondary ms-2"
                      title={`Toggle sort order (currently ${sortOrder})`}
                      onClick={this.toggleSortOrder}
                    >
                      {sortOrder === "asc" ? (
                        <i className="bi bi-sort-alpha-down"></i>
                      ) : (
                        <i className="bi bi-sort-alpha-up"></i>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Table */}
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
                      <th>Destination</th>
                      <th>Days</th>
                      <th>Passengers</th>
                      <th>Hotel</th>
                      <th>Transport</th>
                      <th>Tour Guide</th>
                      <th>Total Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPackages.length > 0 ? (
                      currentPackages.map((pkg, index) => (
                        <tr key={pkg._id}>
                          <td>{(currentPage - 1) * packagesPerPage + index + 1}</td>
                          <td>{pkg.packName}</td>
                          <td>{pkg.Destination}</td>
                          <td>{pkg.NumOfDays}</td>
                          <td>{pkg.NumOfPassen}</td>
                          <td>{pkg.Hotel}</td>
                          <td>{pkg.Transport}</td>
                          <td>{pkg.TourGuide}</td>
                          <td>{pkg.TotPrice}</td>
                          <td>
                            <Link
                              to={`/update/package/${pkg._id}`}
                              className="btn btn-outline-primary btn-sm me-2"
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </Link>
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => this.softRemovePackage(pkg._id)}
                            >
                              <i className="bi bi-x-circle"></i> Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No packages found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav>
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                      style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                    >
                      <span
                        className="page-link"
                        onClick={this.goToPreviousPage}
                        role="button"
                        tabIndex={0}
                      >
                        &lt;
                      </span>
                    </li>

                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                          style={{ cursor: "pointer" }}
                        >
                          <span
                            className="page-link"
                            onClick={() => this.handlePageChange(page)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") this.handlePageChange(page);
                            }}
                          >
                            {page}
                          </span>
                        </li>
                      );
                    })}

                    <li
                      className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                      style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                    >
                      <span
                        className="page-link"
                        onClick={this.goToNextPage}
                        role="button"
                        tabIndex={0}
                      >
                        &gt;
                      </span>
                    </li>
                  </ul>
                </nav>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
