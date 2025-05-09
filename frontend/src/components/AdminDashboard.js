import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useLocation, Switch, Route } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!userRole || userRole !== "admin") {
      history.push("/user/login");
      return;
    }

    fetchDashboardData();
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location = "/home";
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      setDashboardData({
        tourGuideCount: "?",
        hotelCount: "?",
        packageCount: "?",
        userCount: "?",
        bookingCount: 0,
        recentActivities: [],
      });

      const responses = await Promise.allSettled([
        axios.get("http://localhost:8070/tourguide/count"),
        axios.get("http://localhost:8070/hotel/count"),
        axios.get("http://localhost:8070/package/count"),
        axios.get("http://localhost:8070/user/count"),
      ]);

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
      setLoading(false);
    } catch (err) {
      setError("Failed to load dashboard data.");
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    history.push("/home");
  };

  if (loading) {
    return (
      <div
        className="sidebar p-4"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "240px",
          backgroundColor: "#2c2c54",
          zIndex: 10000,
          borderRight: "2px solid #ddd",
        }}
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
      <div className="row">
        {/* Admin Sidebar */}
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
            <div
              onClick={handleLogout}
              className="d-flex align-items-center text-white px-3 py-2"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </div>
          </div>
        </div>

        {/* Admin Dashboard Main Content */}
        <div
          className="col-md-9 col-lg-10 ms-auto"
          style={{ marginLeft: "240px" }}
        >
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
              <div
                className="card text-white"
                style={{ backgroundColor: "#3f51b5" }}
              >
                <div className="card-body">
                  <h6 className="card-title">Tour Guides</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.tourGuideCount}
                  </h2>
                </div>
                <div className="card-footer">
                  <Link to="/add/tourguide" className="text-white">
                    Add Tour Guides
                  </Link>
                </div>
              </div>
              <div
                className="card text-white"
                style={{ backgroundColor: "#3f51b5", marginTop: "10px" }}
              >
                <div className="card-footer">
                  <Link to="/add/tourguide" className="text-white">
                    Manage Tour Guides
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <div
                className="card text-white"
                style={{ backgroundColor: "#4caf50" }}
              >
                <div className="card-body">
                  <h6 className="card-title">Hotels</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.hotelCount}
                  </h2>
                </div>
                <div className="card-footer">
                  <Link to="/add/hotel" className="text-white">
                    Add Hotels
                  </Link>
                </div>
              </div>
              <div
                className="card text-white"
                style={{ backgroundColor: "#4caf50", marginTop: "10px" }}
              >
                <div className="card-footer">
                  <Link to="/all/hotel" className="text-white">
                    Manage Hotels
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <div
                className="card text-white"
                style={{ backgroundColor: "#ff9800" }}
              >
                <div className="card-body">
                  <h6 className="card-title">Packages</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.packageCount}
                  </h2>
                </div>
                <div className="card-footer">
                  <Link to="/add/package" className="text-white">
                    Add Packages
                  </Link>
                </div>
              </div>
              <div
                className="card text-white"
                style={{ backgroundColor: "#ff9800", marginTop: "10px" }}
              >
                <div className="card-footer">
                  <Link to="/manage/AllPacks" className="text-white">
                    Manage Packages
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <div
                className="card text-white"
                style={{ backgroundColor: "#ff5722" }}
              >
                <div className="card-body">
                  <h6 className="card-title">Users</h6>
                  <h2 className="display-4 fw-bold">
                    {dashboardData.userCount}
                  </h2>
                </div>
                <div className="card-footer">
                  <Link to="/all/user" className="text-white">
                    View Reports
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">System Information</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Version
                      <span className="badge bg-primary rounded-pill">
                        2.0.0
                      </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
