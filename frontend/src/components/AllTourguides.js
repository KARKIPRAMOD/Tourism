import React, { Component } from "react";
import axios from "axios";
import WhatsAppContact from "./WhatsAppContact";

export default class AllTourguides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourguides: [],
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
        this.retriveTourguides();
      } else {
        // Redirect unauthorized users
        window.location.href = "/user/login";
      }
    });
  }

  retriveTourguides() {
    axios.get("http://localhost:8070/tourguide/all").then((res) => {
      if (res.data.success) {
        this.setState({
          tourguides: res.data.existingTourguides,
        });
        console.log(this.state.tourguides);
      }
    });
  }

  onDelete(id) {
    fetch(`http://localhost:8070/tourguide/delete/${id}`, {
      method: `DELETE`,
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        alert("Deleted Successfully");
        this.retriveTourguides();
      });
    });
  }

  filterContent(tourguides, searchTerm) {
    const results = tourguides.filter((tourguides) =>
      tourguides.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ tourguides: results });
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:8070/tourguide/all").then((res) => {
      if (res.data.success) {
        this.filterContent(res.data.existingTourguides, searchTerm);
      }
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
        <div className="row">
          <h2 className="text-center">
            <strong>Manage Tourguide Details</strong>
          </h2>
          <div className="col-lg-9 mt-2 mb-2">
            <h6>
              <strong>Search Tourguide Name Here</strong>
            </h6>
          </div>
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
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Gender</th>
                <th scope="col">NIC Number</th>
                <th scope="col">Email</th>
                <th scope="col">Work Experience</th>
                <th scope="col">Amount</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tourguides.map((tourguides, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{tourguides.fullName}</td>
                  <td>{tourguides.age}</td>
                  <td>{tourguides.address}</td>
                  <td>{tourguides.dob}</td>
                  <td>{tourguides.contactNumber}</td>
                  <td>{tourguides.gender}</td>
                  <td>{tourguides.nicNumber}</td>
                  <td>{tourguides.email}</td>
                  <td>{tourguides.workExperience}</td>
                  <td>{tourguides.amount}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.onDelete(tourguides._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Assuming WhatsAppContact is a component you want to show */}
        <WhatsAppContact />
      </div>
    );
  }
}
