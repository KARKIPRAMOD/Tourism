import React, { Component } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa"; // For a placeholder user icon
import { Link } from "react-router-dom"; // For navigation

export default class GuideReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourguides: [],
    };
  }

  componentDidMount() {
    this.retriveTourguides();
  }

  // Retrieve tour guide data from the server
  retriveTourguides() {
    axios.get("http://localhost:8070/tourguide/").then((res) => {
      if (res.data.success) {
        this.setState({
          tourguides: res.data.existingTourguides,
        });
      }
    });
  }

  // Generate report (for printing)
  repotGen = () => {
    window.print();
  };

  render() {
    return (
      <div className="container p-5 mb-5 bg-light">
        <h2 className="text-center mb-5 text-primary">
          <strong>Tour Guides Report</strong>
        </h2>

        {/* Responsive table layout */}
        <section className="p-3" style={{ backgroundColor: "#fff" }}>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tourguides.map((guide, index) => (
                  <tr key={guide._id}>
                    <td>{index + 1}</td>
                    <td>{guide.fullName}</td>
                    <td>{guide.age}</td>
                    <td>{guide.address}</td>
                    <td>{guide.contactNumber}</td>
                    <td>{guide.gender}</td>
                    <td>{guide.eMail}</td>
                    <td>{guide.workExperience}</td>
                    <td>${guide.amount}</td>
                    <td>
                      {/* Link to view or update details */}
                      <Link
                        to={`/update/guide/${guide._id}`}
                        className="btn btn-warning btn-sm mx-1"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.onDelete(guide._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Print Report Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              borderRadius: "30px",
              padding: "12px 30px",
              fontSize: "18px",
            }}
            onClick={this.repotGen}
          >
            <strong>Print Report</strong>
          </button>
        </div>
      </div>
    );
  }
}
