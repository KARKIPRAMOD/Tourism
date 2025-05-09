import React, { useState, useEffect } from "react";
import axios from "axios";

const TourGuideReservationConfirmation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all reservations (whether confirmed or unconfirmed)
    axios
      .get("http://localhost:8070/tourguideReservation/all") // Make sure this endpoint fetches all reservations
      .then((response) => {
        setReservations(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load reservations.");
        setLoading(false);
      });
  }, []);

  const handleConfirm = (reservationId) => {
    axios
      .put(
        `http://localhost:8070/tourguideReservation/confirm/${reservationId}`,
        {
          isConfirmed: true,
        }
      )
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
        `http://localhost:8070/tourguideReservation/confirm/${reservationId}`,
        {
          isConfirmed: false,
        }
      )
      .then((response) => {
        alert("Reservation cancelled!");
        setReservations(
          reservations.filter(
            (reservation) => reservation._id !== reservationId
          )
        );
      })
      .catch((err) => {
        alert("Error cancelling reservation.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Tour Guide Reservations</h2>
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
                  <h5 className="card-title">Tour Guide Reservation</h5>
                  <p className="card-text">
                    <strong>Tour Guide:</strong> {reservation.tourguide.name}
                  </p>
                  <p className="card-text">
                    <strong>Start Date:</strong>{" "}
                    {new Date(reservation.startDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>End Date:</strong>{" "}
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    {/* Show the buttons only for unconfirmed reservations */}
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
                      // For confirmed reservations, show the cancel button
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
  );
};

export default TourGuideReservationConfirmation;
