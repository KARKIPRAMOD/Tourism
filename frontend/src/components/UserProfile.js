// src/components/UserProfile.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/UserProfile.module.css";

import illustration from "../img/login-first.png";
import underCons from "../img/underCons.svg";
import ProfileSidebar from "./Profile";

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      });
  }, [userId]);

  if (!userId) {
    return (
      <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        <div
          className={`text-center ${styles.nocard}`}
          style={{ width: 800, margin: "auto" }}
        >
          <img
            src={illustration}
            alt="Login First"
            className={styles.illustration}
          />
          <h4 style={{ marginBottom: 40 }}>
            <strong>You haven't logged in to your account.</strong>
          </h4>
          <Link
            to="/user/login"
            className={styles.btn_update}
            style={{ marginTop: 20, padding: "6px 40px" }}
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.maincontainer}>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <ProfileSidebar userData={userData} userId={userId} />

        <main className="flex-grow-1">
          {error && <div className="alert alert-danger">{error}</div>}
          {userData ? (
            <div>
              <div className="card border-0 shadow-sm rounded-4 p-4">
                {/* Header Row */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">My Profile</h4>
                </div>

                <div className="d-flex align-items-center gap-3 mb-4">
                  <img
                    src={
                      userData.profile_picture
                        ? `http://localhost:8070/uploads/profile_pictures/${userData.profile_picture}`
                        : "https://via.placeholder.com/100?text=User"
                    }
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="mb-0">{userData.full_name}</h6>
                    <small className="text-muted">{userData.role}</small>
                    <br />
                    <small className="text-muted">{userData.address}</small>
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Personal Information</h6>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p>
                      <strong>First Name:</strong>{" "}
                      {userData.full_name.split(" ")[0]}
                    </p>
                    <p>
                      <strong>Email:</strong> {userData.email}
                    </p>
                    <p>
                      <strong>Bio:</strong> {userData.bio || userData.role}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Last Name:</strong>{" "}
                      {userData.full_name.split(" ")[1] || ""}
                    </p>
                    <p>
                      <strong>Phone:</strong> {userData.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Country:</strong>{" "}
                      {userData.country || "United Kingdom"}
                    </p>
                    <p>
                      <strong>Postal Code:</strong>{" "}
                      {userData.postal || "E3T 3Y64"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>City/State:</strong>{" "}
                      {userData.city || "Leeds, East London"}
                    </p>
                    <p>
                      <strong>Tax ID:</strong> {userData.taxId || "4545454545X"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img
                src={underCons}
                alt="Under Construction"
                className={styles.illustration}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
