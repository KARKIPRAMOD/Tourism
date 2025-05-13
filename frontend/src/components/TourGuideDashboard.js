import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function TourGuideDashboard() {
  const [dashboardData, setDashboardData] = useState({
    bookingCount: 0,
    tourGuideProfile: {},
    reservedTourGuides: [], // Reserved tour guides array
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [dateTime, setDateTime] = useState(new Date());

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

    if (!userRole || userRole !== "tourguide") {
      history.push("/user/login");
      return;
    }

    fetchDashboardData();
  }, [history]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId"); // Get the logged-in user's ID

      // Fetch Tourguide Profile and Reserved Tour Guides using Promise.allSettled
      const responses = await Promise.allSettled([
        axios.get(`http://localhost:8070/tourguide/profile/${userId}`),  // Fetch tour guide profile
        axios.get(`http://localhost:8070/tourguideReservation/reservedforTourGuides/${userId}`) // Fetch reserved tour guides for this user
      ]);
      
      // Log the responses to the console to inspect the data
      console.log("Profile Response:", responses[0]);
      console.log("Reserved Guides Response:", responses[1]);

      // Handle responses and assign data to state
      const data = {
        tourGuideProfile: responses[0].status === "fulfilled" ? responses[0].value.data : {},
        reservedTourGuides: responses[1].status === "fulfilled" ? responses[1].value.data : [], // Correctly accessing data
        bookingCount: responses[1].status === "fulfilled" ? responses[1].value.data.length : 0,  // Counting the number of reserved guides
      };

      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load dashboard data.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.setItem("hideNavbar", "false");
    window.location = "/home";
  };

  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar omitted for brevity */}
        
        {/* Tour Guide Dashboard Main Content */}
        <div className="col-md-9 col-lg-10 ms-auto" style={{ marginLeft: "240px" }}>
          <h2>Your Reserved Tour Guides</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Display reserved tour guides */}
          {dashboardData.reservedTourGuides.length === 0 ? (
            <p>No reserved tour guides found.</p>
          ) : (
            <div>
              <div className="row">
                {dashboardData.reservedTourGuides.map((reservation) => (
                  <div className="col-md-4" key={reservation._id}>
                    <div className="card">
                      <img
                        src={`http://localhost:8070/uploads/tourguide_pictures/${reservation.tourguide.image}`}
                        alt={reservation.tourguide.fullName}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{reservation.tourguide.fullName}</h5>
                        <p className="card-text">
                          Start Date: {new Date(reservation.startDate).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                          End Date: {new Date(reservation.endDate).toLocaleDateString()}
                        </p>
                        <p className="card-text">Amount: {reservation.tourguide.amount} / Day</p>
                        <p className={`badge ${reservation.isConfirmed ? "bg-success" : "bg-warning"}`}>
                          {reservation.isConfirmed ? "Confirmed" : "Unconfirmed"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TourGuideDashboard;
