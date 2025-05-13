import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className={`text-center ${styles.nocard}`} style={{ maxWidth: 600 }}>
          <img src={illustration} alt="Login First" className={styles.illustration} />
          <h4 className="mb-4"><strong>You haven't logged in to your account.</strong></h4>
          <Link to="/user/login" className="btn btn-primary px-4 py-2">
            <i className="bi bi-box-arrow-in-right me-2"></i>Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="row min-vh-100 g-0">
        <ProfileSidebar userData={userData} userId={userId} />
        <main className="col-md-9 p-4 bg-light" style={{ marginLeft: "320px" }}>
          {error && <div className="alert alert-danger">{error}</div>}

          {userData ? (
            <div className="card shadow rounded-4 p-4 bg-white">
              {/* Profile Header */}
              <div className="d-flex align-items-center gap-4 mb-4  text-white p-3 rounded-3">
                <img
                  src={
                    userData.profile_picture
                      ? `http://localhost:8070/uploads/profile_pictures/${userData.profile_picture}`
                      : "https://via.placeholder.com/100?text=User"
                  }
                  alt="Profile"
                  className="rounded-circle border"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div>
                  <h4 className="mb-1" style={{color:"black"}}>{userData.full_name}</h4>
                  <div className="text-muted">
                    <i className="bi bi-shield-person me-1"></i>{userData.role}
                  </div>
                </div>
              </div>

              <hr />

              {/* Personal Info Section */}
              <section className="mb-4">
                <h5 className="text-primary fw-semibold mb-3">
                  <i className="bi bi-person-lines-fill me-2"></i> Personal Information
                </h5>

                <div className="row">
                  {/* First Half of Information */}
                  <div className="col-md-6 mb-3">
                    <div className="card shadow-sm border-light mb-3">
                      <div className="card-header bg-info text-white">
                        <strong>Personal Details</strong>
                      </div>
                      <div className="card-body">
                        <p><i className="bi bi-person me-2"></i><strong>First Name:</strong> {userData.full_name.split(" ")[0]}</p>
                         <p><i className="bi bi-person me-2"></i><strong>Last Name:</strong> {userData.full_name.split(" ")[1] || ""}</p>

                        <p><i className="bi bi-journal-text me-2"></i><strong>Bio:</strong> {userData.bio || userData.role}</p>
                        <p>
                          <div className="text-muted">
                            <i className="bi bi-geo-alt-fill me-1"></i>{userData.address}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Half of Information */}
                  <div className="col-md-6 mb-3">
                    <div className="card shadow-sm border-light mb-3">
                      <div className="card-header bg-warning text-white">
                        <strong>Contact Info</strong>
                      </div>
                      <div className="card-body">
                        <p><i className="bi bi-telephone me-2"></i><strong>Phone:</strong> {userData.phone || "Not provided"}</p>
                       <p><i className="bi bi-envelope me-2"></i><strong>Email:</strong> {userData.email}</p>

                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr />
            </div>
          ) : (
            <div className="text-center p-5">
              <img src={underCons} alt="Under Construction" style={{ maxHeight: 300 }} />
              <p className="mt-3"><i className="bi bi-hourglass-split me-2"></i>Loading profile details...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
