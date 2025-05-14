import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TourGuideProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tourGuideId } = useParams(); // To get from URL params
  const history = useHistory();

  // Fetching the tour guide ID from localStorage if it's not passed in URL
  const storedTourGuideId = localStorage.getItem("userId");

  // If tourGuideId from URL is not found, fall back to localStorage
  const finalTourGuideId = tourGuideId || storedTourGuideId;

  useEffect(() => {
    if (!finalTourGuideId) {
      history.push("/user/login"); // Redirect if no tourGuideId found
      return;
    }

    // Fetch the tour guide profile
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8070/tourguide/${finalTourGuideId}`);
        setProfileData(res.data); // Assuming the response has the profile data
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [finalTourGuideId, history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid py-4"> {/* Change to container-fluid */}
      <div className="row">
        {/* Sidebar */}
        <div
          className="sidebar p-4"
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
          <h3 className="text-center text-white mb-4">Tour Guide Panel</h3>
          <ul className="list-unstyled">
            <li>
              <a href="/tourguide/dashboard" className="d-flex align-items-center text-white px-3 py-2">
                <i className="bi bi-house-door me-2"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="/tourguide/profile" className="d-flex align-items-center text-white px-3 py-2">
                <i className="bi bi-person-circle me-2"></i> Profile
              </a>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto">
            <div
              onClick={() => {
                localStorage.removeItem("userRole");
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                localStorage.setItem("hideNavbar", "false");

                window.location = "/home";
              }}
              className="d-flex align-items-center text-white px-3 py-2"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 ms-auto" style={{ marginLeft: "260px" }}> {/* Adjusted margin for wider space */}

          {/* Profile Card Layout */}
          {profileData && (
            <div className="container">
              <div className="row justify-content-center">
                {/* Profile Picture and Info Section in the Same Container */}
                <div className="col-md-12 col-lg-10"> {/* Increased width for larger profile */}
                  <div
                    className="card shadow-sm mb-4"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="card-body">
                      {/* Profile Picture and Basic Info */}
                      <div className="d-flex align-items-center mb-4">
                        <img
                          src={`http://localhost:8070/uploads/tourguide_pictures/${profileData.guide.image}`}
                          alt={profileData.guide.fullName}
                          className="rounded-circle"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            marginRight: "20px",
                            border: "4px solid #ddd",
                          }}
                        />
                        <div>
                          <h5 className="mb-1">{profileData.guide.fullName}</h5>
                          <p className="text-muted">{profileData.guide.role}</p>
                        </div>
                      </div>

                      {/* Personal Information Section */}
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
                              <p><i className="bi bi-person me-2"></i><strong>First Name:</strong> {profileData.guide.fullName.split(" ")[0]}</p>
                              <p><i className="bi bi-person me-2"></i><strong>Last Name:</strong> {profileData.guide.fullName.split(" ")[1] || ""}</p>
                              <p><i className="bi bi-journal-text me-2"></i><strong>Bio:</strong> {profileData.guide.description || profileData.guide.role}</p>
                              <p><i className="bi bi-geo-alt-fill me-1"></i>{profileData.guide.address}</p>
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
                              <p><i className="bi bi-telephone me-2"></i><strong>Phone:</strong> {profileData.guide.contactNumber || "Not provided"}</p>
                              <p><i className="bi bi-envelope me-2"></i><strong>Email:</strong> {profileData.guide.eMail}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr />
                      {/* Tour Guide Info Section */}
                      <h5 className="text-primary fw-semibold mb-3">
                        <i className="bi bi-clipboard-data me-2"></i> Tour Guide Information
                      </h5>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <p><strong>Work Experience:</strong> {profileData.guide.workExperience} years</p>
                          <p><strong>Daily Rate:</strong> NRS {profileData.guide.amount}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Description:</strong> {profileData.guide.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TourGuideProfile;
