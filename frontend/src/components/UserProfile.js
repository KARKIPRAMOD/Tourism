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

        <main className="flex-grow-1 p-5">
          {error && <div className="alert alert-danger">{error}</div>}
          {userData ? (
            <div className="card p-4">
              <h3 className="mb-4">My Profile</h3>
              <div className="row">
                <div className="col-md-8">
                  <p>
                    <strong>Full Name:</strong> {userData.full_name}
                  </p>
                  <p>
                    <strong>Username:</strong> {userData.user_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phone || "Not provided"}
                  </p>
                  <p>
                    <strong>Role:</strong> {userData.role}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {userData.address || "Not provided"}
                  </p>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-start">
                  <img
                    src={
                      userData.profile_picture
                        ? `http://localhost:8070/uploads/profile_pictures/${userData.profile_picture}`
                        : "https://via.placeholder.com/150?text=User"
                    }
                    alt="Large Profile"
                    className={styles.largeProfilePic}
                  />
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
