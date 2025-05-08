import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css";
import AdminSidebar from "./adminSidebar"; // Import AdminSidebar

export default class AllUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.retriveUsers();
  }

  // Retrieve all users
  retriveUsers() {
    axios.get("http://localhost:8070/user/all").then((res) => {
      if (res.data.success) {
        this.setState({
          users: res.data.users,
        });
      }
    });
  }

  // Delete user
  deleteUser(id) {
    axios.delete(`http://localhost:8070/user/delete/${id}`).then((res) => {
      if (res.data.success) {
        alert("User deleted successfully");
        this.retriveUsers(); // Refresh the user list
      } else {
        alert("Failed to delete user");
      }
    });
  }

  render() {
    return (
      <div className={styles.body}>
        <div className="row">
          {/* Admin Sidebar */}
          <div className="col-md-3 col-lg-2">
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
          </div>

          {/* Main Content */}
          <div
            className="col-md-9 col-lg-10 ms-auto"
            style={{ marginLeft: "240px" }}
          >
            <main className={styles.Main1}>
              <h2>Users List</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.user_name}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            onClick={() => this.deleteUser(user._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
