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
    backgroundImage: `url(https://1.bp.blogspot.com/-a3xjUjfN0Uo/Wbooun_zqoI/AAAAAAAAAFc/4rhDjGQhUUgV5tUxbrNF-SNAgJfgR7FOwCLcBGAs/s1600/nepal-tour.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)", // Adding shadow for better visibility
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

        {/* Package Cards Section */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5" id="packages">
          {this.state.packages.map((pack, index) => (
            <div className="col" key={index}>
              <Link
                to={`/package-details/${pack._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card shadow-lg border-0 rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    borderRadius: "20px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
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

        {/* Footer with some padding at the bottom to ensure content doesn't look cut off */}
        <footer style={{ padding: "20px 0", textAlign: "center", backgroundColor: "#f8f9fa" }}>
        </footer>
      </div>
    );
  }
}
