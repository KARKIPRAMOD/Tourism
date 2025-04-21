import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// Admin Dashboard Component
function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    tourGuideCount: 0,
    hotelCount: 0,
    packageCount: 0,
    userCount: 0,
    bookingCount: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const formattedDate = dateTime.toLocaleDateString(); // Format date (e.g., 4/10/2025)
  const formattedTime = dateTime.toLocaleTimeString(); // Format time (e.g., 14:30:45)

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    // Debug token and role
    console.log("AdminDashboard - User Role:", userRole);
    console.log("AdminDashboard - Token exists:", !!token);

    if (!userRole || userRole !== "admin") {
      console.log("Not admin role, redirecting to login");
      history.push("/user/login");
      return;
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [history]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Use basic data if API routes aren't ready yet
      setDashboardData({
        tourGuideCount: "?",
        hotelCount: "?",
        packageCount: "?",
        userCount: "?",
        bookingCount: 0,
        recentActivities: [],
      });

      // Attempt to fetch real data
      try {
        // Fetch statistics
        const responses = await Promise.allSettled([
          axios.get("http://localhost:8070/tourguide/count"),
          axios.get("http://localhost:8070/hotel/count"),
          axios.get("http://localhost:8070/package/count"),
          axios.get("http://localhost:8070/user/count"),
        ]);

        // Even if some requests fail, we'll show what data we can get
        const data = {
          tourGuideCount:
            responses[0].status === "fulfilled"
              ? responses[0].value.data.count
              : "?",
          hotelCount:
            responses[1].status === "fulfilled"
              ? responses[1].value.data.count
              : "?",
          packageCount:
            responses[2].status === "fulfilled"
              ? responses[2].value.data.count
              : "?",
          userCount:
            responses[3].status === "fulfilled"
              ? responses[3].value.data.count
              : "?",
          bookingCount: 0,
          recentActivities: [],
        };

        setDashboardData(data);
      } catch (apiError) {
        console.warn("API data fetch failed:", apiError);
        // Already using fallback data, so no additional action needed
      }

      setLoading(false);
    } catch (err) {
      console.error("Error in dashboard data handling:", err);
      setError("Failed to load dashboard data.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <h4 className="mt-3">Loading Dashboard...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Admin Dashboard</h1>
        <button
          onClick={fetchDashboardData}
          className="btn btn-sm btn-outline-primary"
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-lg-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Tour Guides</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.tourGuideCount}
                  </h2>
                </div>
                <i className="bi bi-people fs-1"></i>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to="/all/tourguides" className="text-white">
                Manage Tour Guides
              </Link>
              <i className="bi bi-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Hotels</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.hotelCount}
                  </h2>
                </div>
                <i className="bi bi-building fs-1"></i>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to="/all/hotel" className="text-white">
                Manage Hotels
              </Link>
              <i className="bi bi-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Tour Packages</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.packageCount}
                  </h2>
                </div>
                <i className="bi bi-map fs-1"></i>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to="/manage/AllPacks" className="text-white">
                Manage Packages
              </Link>
              <i className="bi bi-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Users</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.userCount}
                  </h2>
                </div>
                <i className="bi bi-people fs-1"></i>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to="/all/user" className="text-white">
                View Reports
              </Link>
              <i className="bi bi-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6 col-lg-4">
                  <div className="d-grid">
                    <Link
                      to="/add/tourguide"
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Add Tour Guide
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-grid">
                    <Link to="/add/hotel" className="btn btn-outline-success">
                      <i className="bi bi-building-add me-2"></i>
                      Add Hotel
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-grid">
                    <Link to="/add/package" className="btn btn-outline-info">
                      <i className="bi bi-plus-square me-2"></i>
                      Add Package
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-grid">
                    <Link to="/guidereport" className="btn btn-outline-dark">
                      <i className="bi bi-file-text me-2"></i>
                      Guide Report
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-grid">
                    <Link
                      to="/view/payment+history"
                      className="btn btn-outline-warning"
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      Payment History
                    </Link>
                  </div>
                </div>
                {/* <div className="col-md-6 col-lg-4">
                  <div className="d-grid">
                    <Link to="/tour-updates" className="btn btn-outline-danger">
                      <i className="bi bi-gear me-2"></i>
                      Tour Updates
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Version
                  <span className="badge bg-primary rounded-pill">2.0.0</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Time
                  <span className="badge bg-success rounded-pill">
                    {formattedTime}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Date
                  <span>{formattedDate}</span>
                </li>
              </ul>
            </div>
            <div className="card-footer text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
