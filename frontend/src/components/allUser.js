import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css";

const handleLogout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  window.location = "/home";
};

export default class AllUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    fetch("http://localhost:8070/user/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({ users: data.users });
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }

  // Soft delete locally without calling API
  softDeleteUser = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user._id !== id),
    }));
  };

  render() {
    const { users } = this.state;

    return (
      <div className={styles.body}>
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
                to="/adminHotel"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-building me-2"></i> Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/adminPackage"
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

        {/* Main Content */}
        <div style={{ marginLeft: "260px" }} className="container py-4">
          <h2 className="mb-4 text-center">Users Management</h2>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.user_name}</td>
                          <td>{user.full_name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className="badge bg-primary rounded-pill">
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => this.softDeleteUser(user._id)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              <i className="bi bi-trash-fill"></i> Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
