import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css"; // Assuming your custom styles are in All.module.css
import { FaUserAlt } from "react-icons/fa"; // Example icon

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
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.logo_content}>
            <div className={styles.logo}>
              <i className={styles.logo1}>
                <FaUserAlt />
              </i>
              <div className={styles.logo_name}>Travelo</div>
            </div>
          </div>
          <div className={styles.nav_list}>
            <li className={styles.list}>
              <Link to="/add/user" className={styles.sidelinks}>
                <span className={styles.links_name}>Add User</span>
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/all/user" className={styles.sidelinks}>
                <span className={styles.links_name}>All Users</span>
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/update/user/:id" className={styles.sidelinks}>
                <span className={styles.links_name}>Update User</span>
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/print/user" className={styles.sidelinks}>
                <span className={styles.links_name}>Print User Details</span>
              </Link>
            </li>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <header className={styles.headert}>
            <h4>Manager Panel</h4>
          </header>

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
                        <Link
                          to={`/update/user/${user._id}`}
                          className="btn btn-warning btn-sm mr-2"
                        >
                          Edit
                        </Link>
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
    );
  }
}
