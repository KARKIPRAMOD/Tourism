import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import myStyle from "../style_sheets/Style.module.css";
import Footer from "./Footer";

export default class CusPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      filteredPackages: [],
      filterDestination: "All",
      filterNumOfDays: "All",
      filterMaxPrice: 0,
      maxPriceLimit: 1000,
    };
  }

  componentDidMount() {
    this.retrivePackages();
  }

  retrivePackages() {
    axios
      .get("http://localhost:8070/package/all")
      .then((res) => {
        const packages = res.data || [];

        // Find max price for slider max limit
        const maxPrice = packages.length
          ? Math.max(...packages.map((p) => p.TotPrice + 5 || 0))
          : 100000;

        this.setState(
          {
            packages,
            filteredPackages: packages,
            filterMaxPrice: maxPrice,
            maxPriceLimit: maxPrice,
          },
          this.applyFilters
        );
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
      });
  }

  handleFilterChange = (e) => {
    const { name, value } = e.target;

    this.setState(
      {
        [name]: name === "filterMaxPrice" ? Number(value) : value,
      },
      this.applyFilters
    );
  };

  applyFilters = () => {
    const { packages, filterDestination, filterNumOfDays, filterMaxPrice } = this.state;

    const filtered = packages.filter((pack) => {
      if (filterDestination !== "All" && pack.Destination !== filterDestination) {
        return false;
      }
      if (filterNumOfDays !== "All" && pack.NumOfDays.toString() !== filterNumOfDays) {
        return false;
      }
      if ((pack.TotPrice || 0) > filterMaxPrice) {
        return false;
      }
      return true;
    });

    this.setState({ filteredPackages: filtered });
  };

  render() {
    const {
      filteredPackages,
      filterDestination,
      filterNumOfDays,
      filterMaxPrice,
      maxPriceLimit,
      packages,
    } = this.state;

    // Get unique options for filters
    const uniqueDestinations = ["All", ...new Set(packages.map((p) => p.Destination).filter(Boolean))];
    const uniqueDays = ["All", ...new Set(packages.map((p) => p.NumOfDays?.toString()).filter(Boolean))];

    return (
      <div className="container-fluid px-5">
        {/* Hero Banner */}
        <div
          className="position-relative text-white text-center py-5 mb-5"
          style={{
            backgroundImage: `url(https://1.bp.blogspot.com/-a3xjUjfN0Uo/Wbooun_zqoI/AAAAAAAAAFc/4rhDjGQhUUgV5tUxbrNF-SNAgJfgR7FOwCLcBGAs/s1600/nepal-tour.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              top: 0,
              left: 0,
              borderRadius: "12px",
            }}
          ></div>
          <div className="position-relative z-1">
            <h1 className="display-4 fw-bold">Explore Our Tour Packages</h1>
            <p className="lead mb-4">Discover the best destinations and create memories that last</p>
            <a href="#packages" className="btn btn-light btn-lg text-dark">
              Explore Now
            </a>
          </div>
        </div>

        {/* Main content with sidebar and packages */}
        <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
          {/* Sidebar Filters */}
          <aside
            style={{
              flex: "0 0 280px",
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              height: "fit-content",
            }}
          >
            <h4 className="mb-3">Filters</h4>

            <div className="mb-3">
              <label htmlFor="filterDestination" className="form-label fw-bold">
                Destination
              </label>
              <select
                id="filterDestination"
                name="filterDestination"
                value={filterDestination}
                onChange={this.handleFilterChange}
                className="form-select"
              >
                {uniqueDestinations.map((dest, i) => (
                  <option key={i} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="filterNumOfDays" className="form-label fw-bold">
                Number of Days
              </label>
              <select
                id="filterNumOfDays"
                name="filterNumOfDays"
                value={filterNumOfDays}
                onChange={this.handleFilterChange}
                className="form-select"
              >
                {uniqueDays.map((day, i) => (
                  <option key={i} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="filterMaxPrice" className="form-label fw-bold d-block">
                Max Price (NRS): {filterMaxPrice}
              </label>
              <input
                type="range"
                id="filterMaxPrice"
                name="filterMaxPrice"
                min="0"
                max={maxPriceLimit}
                step="100"
                value={filterMaxPrice}
                onChange={this.handleFilterChange}
                className="form-range"
              />
            </div>
          </aside>

          {/* Packages Section */}
          <section style={{ flex: "1" }}>
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5" id="packages">
              {filteredPackages.length ? (
                filteredPackages.map((pack, index) => (
                  <div className="col" key={index}>
                    <Link to={`/package-details/${pack._id}`} style={{ textDecoration: "none" }}>
                      <div
                        className="card shadow-lg border-0 rounded-4 overflow-hidden"
                        style={{
                          backgroundColor: "#fff",
                          cursor: "pointer",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          borderRadius: "20px",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <div className="card-img-top">
                          <img
                            src={
                              pack.Images && pack.Images[1]
                                ? `http://localhost:8070/${pack.Images[1]}`
                                : "default-image.jpg"
                            }
                            alt={pack.packName}
                            className="img-fluid"
                            style={{
                              objectFit: "cover",
                              height: "200px",
                              width: "90%",
                              borderRadius: "15px",
                              margin: "20px",
                            }}
                          />
                        </div>
                        <div className="card-body p-3">
                          <h5 className="fw-bold text-primary" style={{ fontSize: "1.3rem" }}>
                            {pack.packName}
                          </h5>
                          <p className="text-muted" style={{ fontSize: "1rem" }}>
                            {pack.description || "A beautiful destination."}
                          </p>
                          <p className="text-muted">No Of Days: {pack.NumOfDays}</p>
                          <p className="text-muted">Destination: {pack.Destination}</p>
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2 text-warning">★★★★☆</span>
                            <span className="fw-bold text-dark">NRS {pack.TotPrice} / Person</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center mt-5 fs-4 text-muted">No packages found matching the filters.</p>
              )}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}
