import React, { Component } from "react";
import axios from "axios";
import Train from "../img/my23.jpg"; // Can use a placeholder image if you want
import "../App.css";
import myStyle from "../style_sheets/Style.module.css";

export default class CusPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoggedIn: !!localStorage.getItem("userId"),
    };
  }

  componentDidMount() {
    this.retrivePackages();
  }

  retrivePackages() {
    axios
      .get("http://localhost:8070/package/all")
      .then((res) => {
        this.setState({
          packages: res.data || [],
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
      });
  }

  filterContent(packages, searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    const results = packages.filter((pack) =>
      pack.Destination?.toLowerCase().includes(searchTermLower)
    );
    this.setState({ packages: results });
  }

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
        console.error("Error fetching packages:", error);
      });
  };

  handleCustomizeClick = (e) => {
    if (!this.state.isLoggedIn) {
      e.preventDefault();
      if (
        window.confirm(
          "Please login to customize your tour package. Would you like to login now?"
        )
      ) {
        window.location.href = "/user/login";
      }
    }
  };

  render() {
    return (
      <div className="container-fluid px-5">
        {/* Hero Banner */}
        <div
          className="position-relative text-white text-center py-5 mb-5"
          style={{
            backgroundImage: `url(${Train})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
          }}
        >
          <div
            className="position-absolute w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", top: 0, left: 0 }}
          ></div>
          <div className="position-relative z-1">
            <h1 className="display-5 fw-bold">Explore Our Tour Packages</h1>
            <p className="lead">Find the perfect getaway destination</p>
          </div>
        </div>

        {/* Customize Button */}
        <div className="text-end mb-4">
          <a
            href={this.state.isLoggedIn ? "/customize/package" : "#"}
            onClick={this.handleCustomizeClick}
            className="btn btn-primary shadow"
          >
            <i className="fa-solid fa-sliders"></i>&nbsp;
            {this.state.isLoggedIn
              ? "Customize Your Tour"
              : "Login to Customize Tour"}
          </a>
        </div>

        {/* Search */}
        <div className="row mb-4 justify-content-end">
          <div className="col-md-4">
            <input
              className="form-control"
              type="search"
              placeholder="🔍 Search Destination"
              onChange={this.handleTextSearch}
            />
          </div>
        </div>

        {/* Cards Grid - No Image for now */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {this.state.packages.map((pack, index) => {
            console.log(pack);
            return (
              <div className="col-md-12" key={index}>
                <div className="card mb-4 shadow-sm border-0 rounded-4 overflow-hidden">
                  <div className="row g-0">
                    <div className="col-md-8 p-3 d-flex flex-column">
                      <div>
                        <h5 className="fw-bold text-primary">
                          {pack.packName}
                        </h5>
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2 text-warning">
                            ★★★★☆
                            {/* Replace with a rating component if dynamic */}
                          </span>
                          <span className="fw-bold text-dark">
                            Rs. {pack.TotPrice}
                          </span>
                        </div>
                        <p
                          className="text-muted"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {pack.description ||
                            "Enjoy beautiful destinations with top amenities. Family-friendly, relaxing, and memorable."}
                        </p>

                        <div className="d-flex flex-wrap gap-3 my-3">
                          <span className="badge bg-light text-dark border px-3 py-2">
                            🎫 Number of people: {pack.NumOfPassen || 40}
                          </span>
                          <span className="badge bg-light text-dark border px-3 py-2">
                            📅 Start Date: {pack.startDate || "20.11.2022"}
                          </span>
                          <span className="badge bg-light text-dark border px-3 py-2">
                            ⏰ End Date: {pack.endDate || "02.12.2022"}
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-3 mb-3">
                          <span className="badge bg-danger text-white">
                            📍 {pack.Destination}
                          </span>
                          <span className="badge bg-warning text-dark">
                            🍽️ Breakfast & Dinner
                          </span>
                          <span className="badge bg-success text-white">
                            🌇 First-Class Sightseeing
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto d-flex gap-2">
                        <a
                          href="/book/package"
                          className="btn btn-danger rounded-pill px-4"
                        >
                          BOOK NOW
                        </a>
                        <a
                          href={`/package/${pack.id}`}
                          className="btn btn-outline-secondary rounded-pill px-4"
                        >
                          SEE DETAILS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="text-start mt-5">
          <a href="/view/cuspackage" className={myStyle.btnBack}>
            <strong>← Back</strong>
          </a>
        </div>

        <br />
        <div className="card-footer text-muted mt-4"></div>
      </div>
    );
  }
}
