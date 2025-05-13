import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import myStyle from "../style_sheets/Style.module.css";

export default class CusPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
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

  render() {
    return (
      <div className="container-fluid px-5">
        {/* Hero Banner */}
        <div
          className="position-relative text-white text-center py-5 mb-5"
          style={{
            backgroundImage: `url(../img/my23.jpg)`,
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

        {/* Package Cards */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {this.state.packages.map((pack, index) => (
            <div className="col" key={index}>
              <Link
                to={`/package-details/${pack._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card shadow-sm border-0 rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  // Hover effect: Scale and shadow
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <div className="card-img-top">
                    {/* Display image or fallback */}
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
                        margin: "25px",
                      }}
                    />
                  </div>
                  <div className="card-body p-3">
                    <h5 className="fw-bold text-primary" style={{ fontSize: "1.2rem" }}>
                      {pack.packName}
                    </h5>
                    <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {pack.description || "A beautiful destination."}
                    </p>
                         <p>NO Of Days: {pack.NumOfDays}</p>
                      <p>Destination: {pack.Destination}</p>
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2 text-warning">★★★★☆</span>
                      <span className="fw-bold text-dark">
                        NRS {pack.TotPrice} / Person
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
