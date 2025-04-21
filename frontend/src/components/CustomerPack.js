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
        if (res.data.success) {
          this.setState({
            packages: res.data.existingPackages,
          });
        }
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
        <div className="row g-4">
          {this.state.packages.map((pack, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 p-3">
                <h5 className="fw-bold mb-3 text-primary">
                  <i className="fa-solid fa-map-signs"></i>&nbsp;
                  {pack.packName}
                </h5>
                <p>
                  <i className="fa-solid fa-location-dot text-danger"></i>&nbsp;
                  <strong>Destination:</strong> {pack.Destination}
                </p>
                <p>
                  <i className="fa-solid fa-calendar-days text-success"></i>
                  &nbsp;
                  <strong>Days:</strong> {pack.NumOfDays}
                </p>
                <p>
                  <i className="fa-solid fa-user-group text-warning"></i>&nbsp;
                  <strong>Passengers:</strong> {pack.NumOfPassen}
                </p>
                <p>
                  <i className="fa-solid fa-money-bill-wave text-info"></i>
                  &nbsp;
                  <strong>Price:</strong> Rs. {pack.TotPrice}
                </p>
                <div className="text-center mt-auto">
                  <a href="/book/package" className="btn btn-outline-primary">
                    <i className="fa-solid fa-plane-up"></i>&nbsp;Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
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
