import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotelReservationConfirmation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8070/HotelReservation/") // Fetch all reservations
      .then((response) => {
        if (Array.isArray(response.data.reservations)) {
          setReservations(response.data.reservations);
        } else {
          setReservations([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load reservations.");
        setLoading(false);
      });
  }, []);

  const handleConfirm = (reservationId) => {
    axios
      .put(`http://localhost:8070/HotelReservation/confirm/${reservationId}`, {
        isConfirmed: true,
      })
      .then(() => {
        alert("Reservation confirmed!");
        setReservations((prev) =>
          prev.map((res) =>
            res._id === reservationId ? { ...res, isConfirmed: true } : res
          )
        );
      })
      .catch(() => {
        alert("Error confirming reservation.");
      });
  };

  const handleCancel = (reservationId) => {
    axios
      .put(`http://localhost:8070/HotelReservation/confirm/${reservationId}`, {
        isConfirmed: false,
      })
      .then(() => {
        alert("Reservation cancelled!");
        setReservations((prev) => prev.filter((res) => res._id !== reservationId));
      })
      .catch(() => {
        alert("Error cancelling reservation.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location = "/home";
  };

  // Pagination calculations
  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentReservations = reservations.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
        <h2>Hotel Reservations</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reservations...</p>
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <>
            <div className="row">
              {currentReservations.map((reservation) => (
                <div className="col-md-4" key={reservation._id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <p className="card-text">
                        <strong>Hotel Name :</strong> {reservation.hotel?.name || "N/A"}
                      </p>
                      <p className="card-text">
                        <strong>From :</strong>{" "}
                        {reservation.fromDate
                          ? new Date(reservation.fromDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="card-text">
                        <strong>To:</strong>{" "}
                        {reservation.toDate
                          ? new Date(reservation.toDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="card-text">
                        <strong>Rooms :</strong> {reservation.noOfRooms || "N/A"}
                      </p>
                      <p className="card-text">
                        <strong>Type :</strong> {reservation.roomType || "N/A"}
                      </p>
                      <p className="card-text">
                        <strong>Price  :</strong> {reservation.priceAtBooking || "N/A"}
                      </p>

                      <hr style={{ borderTop: "2px solid #ddd" }} />

                      <div className="user-info" style={{ position: "relative" }}>
                        {reservation.user?.profile_picture && (
                          <img
                            src={`http://localhost:8070/uploads/profile_pictures/${reservation.user.profile_picture}`}
                            alt={reservation.user.full_name || "User"}
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "20%",
                              objectFit: "cover",
                              border: "3px solid rgb(7, 7, 7)",
                              position: "absolute",
                              right: "10px",
                              bottom: "70px",
                            }}
                          />
                        )}
                        <p className="card-text">
                          <strong>Booked BY:</strong>
                        </p>
                        <p className="card-text">
                          <strong>User Name :</strong> {reservation.user?.full_name || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>User Email :</strong> {reservation.user?.email || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>User Phone :</strong> {reservation.user?.phone || "N/A"}
                        </p>
                      </div>

                      <div
                        className="d-flex justify-content-between"
                        style={{ margin: "20px" }}
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

            {/* Pagination */}
            <div style={{ marginTop: "40px" }}>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? "active" : ""}`}
                      >
                        <button className="page-link" onClick={() => goToPage(page)}>
                          {page}
                        </button>
                      </li>
                    );
                  })}

                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HotelReservationConfirmation;
