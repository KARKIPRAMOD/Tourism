import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PackageConfirmation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/reservePackageRouter/") // Ensure this endpoint fetches all reservations
      .then((response) => {
        if (Array.isArray(response.data.reservations)) {
          setReservations(response.data.reservations);
        } else {
          setReservations([]); // Ensuring empty array if the response is not in the expected format
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load reservations.");
        setLoading(false);
      });
  }, []);

  const handleConfirm = (reservationId) => {
    axios
      .put(`http://localhost:8070/reservePackageRouter/confirm/${reservationId}`)
      .then((response) => {
        alert("Reservation confirmed!");
        setReservations(
          reservations.map((reservation) =>
            reservation._id === reservationId
              ? { ...reservation, isConfirmed: true }
              : reservation
          )
        );
      })
      .catch((err) => {
        alert("Error confirming reservation.");
        console.error(err);
      });
  };

  const handleCancel = (reservationId) => {
    axios
      .put(
        `http://localhost:8070/reservePackageRouter/confirm/${reservationId}`,
        { isConfirmed: false }
      )
      .then((response) => {
        alert("Reservation cancelled!");
        setReservations(
          reservations.filter((reservation) => reservation._id !== reservationId)
        );
      })
      .catch((err) => {
        alert("Error cancelling reservation.");
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location = "/home";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
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

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "20px", marginLeft: "240px" }}>
        <h2>Package Reservations</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reservations...</p>
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <div className="row">
            {reservations.map((reservation) => (
              <div className="col-md-4" key={reservation._id}>
                <div className="card mb-3">
                  <div className="card-body">
                    {/* Package Information at the Top */}
                    <h5 className="card-title">Package Reservation</h5>
                    <p className="card-text">
                      <strong>Package Name:</strong> {reservation.package.packName}
                    </p>
                    <p className="card-text">
                      <strong>Start Date:</strong>{" "}
                      {new Date(reservation.startDate).toLocaleDateString()}
                    </p>
             

                    {/* Line Between Package and User Details */}
                    <hr style={{ borderTop: "2px solid #ddd" }} />

                    {/* User Information at the Bottom */}
                    <div className="user-info" style={{ position: "relative" }}>
                      {/* User Image on Bottom Right */}
                      {reservation.user.profile_picture && (
                        <img
                          src={`http://localhost:8070/uploads/profile_pictures/${reservation.user.profile_picture}`}
                          alt={reservation.user.full_name}
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "20%",
                            objectFit: "cover",
                            border: "3px solid rgb(4, 4, 4)",
                            position: "absolute", 
                            right: "10px",
                            bottom: "10px",
                          }}
                        />
                      )}
                      <p className="card-text">
                        <strong>User Full Name:</strong>{" "}
                        {reservation.user.full_name}
                      </p>
                      <p className="card-text">
                        <strong>User Email:</strong> {reservation.user.email}
                      </p>
                      <p className="card-text">
                        <strong>User Phone:</strong> {reservation.user.phone}
                      </p>
                    </div>

                    {/* Reservation buttons */}
                    <div className="d-flex justify-content-between" style={{margin:"20px"}}
>
                      {!reservation.isConfirmed ? (
                        <>
                          <button
                            onClick={() => handleConfirm(reservation._id)}
                            className="btn btn-success"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleCancel(reservation._id)}
                            className="btn btn-danger"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleCancel(reservation._id)}
                          className="btn btn-warning"
                        >
                          Cancel Reservation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageConfirmation;
