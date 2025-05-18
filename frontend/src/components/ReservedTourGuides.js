import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile";
import { Rating } from "@mui/material";

const ReservedTourGuides = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [tourGuideDetails, setTourGuideDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  // Feedback state per reservation
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch(() => setError("Failed to load user data"));

    axios
      .get(`http://localhost:8070/tourguideReservation/reservedTourGuides/${userId}`)
      .then((res) => {
        const reservations = res.data || [];
        setReservations(reservations);
        setLoading(false);

        const details = {};
        const tourGuideRequests = reservations.map((reservation) => {
          const tourGuideId =
            typeof reservation.tourguide === "object"
              ? reservation.tourguide._id
              : reservation.tourguide;

          return axios
            .get(`http://localhost:8070/tourguide/${tourGuideId}`)
            .then((res) => {
              details[tourGuideId] = res.data;
            })
            .catch(() => setError("Failed to load tour guide details"));
        });

        Promise.all(tourGuideRequests).then(() => setTourGuideDetails(details));
      })
      .catch(() => {
        setError("Failed to load reserved tour guides");
        setLoading(false);
      });
  }, [userId]);

  const handleFeedbackChange = (reservationId, field, value) => {
    setFeedbacks((prev) => ({
      ...prev,
      [reservationId]: {
        ...prev[reservationId],
        [field]: value,
      },
    }));
  };

  const submitFeedback = (reservationId, tourGuideId) => {
    const feedback = feedbacks[reservationId];
    if (!feedback || !feedback.rating || !feedback.message) {
      alert("Please provide both rating and feedback message.");
      return;
    }

    axios
      .post(`http://localhost:8070/feedback/add`, {
        userId,
        tourguideId: tourGuideId,
        rating: feedback.rating,
        message: feedback.message,
        reservationId,
      })
      .then(() => {
        alert("Feedback submitted successfully!");
        setFeedbacks((prev) => ({
          ...prev,
          [reservationId]: { ...prev[reservationId], submitted: true },
        }));
      })
      .catch(() => alert("Failed to submit feedback, please try again later."));
  };

  if (!userId) {
    return <div>You haven't logged in to your account.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f7f7",
      }}
    >
      <ProfileSidebar userData={userData} userId={userId} />

      <main
        style={{
          flexGrow: 1,
          padding: "30px",
          overflowY: "auto",
          marginLeft: "320px",
        }}
      >
        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <p>Loading reserved tour guides...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved tour guides found.</p>
        ) : (
          <>
            <h2
              style={{
                color: "#007bff",
                fontWeight: "600",
                textAlign: "center",
                width: "fit-content",
                margin: "0 auto 30px auto",
              }}
            >
              Your Reserved Tour Guides
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "flex-start",
              }}
            >
              {reservations.map((reservation) => {
                const tourGuideId =
                  typeof reservation.tourguide === "object"
                    ? reservation.tourguide._id
                    : reservation.tourguide;
                const guide = tourGuideDetails[tourGuideId];

                const feedback = feedbacks[reservation._id] || {};

                return (
                  <div
                    key={reservation._id}
                    style={{
                      width: "300px",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "transform 0.3s ease",
                      transform: "scale(1)",
                      paddingBottom: "10px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <img
                      src={
                        guide?.guide?.image
                          ? `http://localhost:8070/uploads/tourguide_pictures/${guide.guide.image}`
                          : "https://via.placeholder.com/300x200"
                      }
                      alt={guide?.guide?.fullName}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <div
                      style={{
                        padding: "16px",
                        backgroundColor: "#fff",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1d3c6d",
                          textTransform: "capitalize",
                        }}
                      >
                        {guide?.guide?.fullName || "Loading..."}
                      </h4>
                      <p style={{ color: "#555", fontSize: "14px", marginBottom: "8px" }}>
                        <strong>Age:</strong> {guide?.guide?.age || "N/A"}
                      </p>
                      <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.4" }}>
                        <strong>From:</strong>{" "}
                        {new Date(reservation.startDate).toLocaleDateString()} <br />
                        <strong>To:</strong> {new Date(reservation.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        For: NRP <strong>{guide?.guide?.amount} /Day</strong>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-block",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            backgroundColor: reservation.isConfirmed
                              ? "#e6fcf5"
                              : "#fff4e6",
                            color: reservation.isConfirmed ? "#0ca678" : "#e8590c",
                            fontWeight: "600",
                            fontSize: "13px",
                            border: `1px solid ${
                              reservation.isConfirmed ? "#96f2d7" : "#ffc078"
                            }`,
                          }}
                        >
                          {reservation.isConfirmed ? "✔ Confirmed" : "⏳ Unconfirmed"}
                        </div>
                      </div>

                      {/* Feedback form toggle */}
                      {reservation.isConfirmed && !feedback.submitted && (
                        <>
                          <button
                            style={{
                              marginTop: "15px",
                              backgroundColor: "#007bff",
                              color: "white",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setFeedbacks((prev) => ({
                                ...prev,
                                [reservation._id]: {
                                  ...prev[reservation._id],
                                  showForm: !prev[reservation._id]?.showForm,
                                },
                              }))
                            }
                          >
                            {feedback.showForm ? "Cancel Feedback" : "Give Feedback"}
                          </button>

                          {feedback.showForm && (
                            <div
                              style={{
                                marginTop: "10px",
                                textAlign: "left",
                                backgroundColor: "#f9fafb",
                                padding: "10px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                              }}
                            >
                              <Rating
                                name={`rating-${reservation._id}`}
                                value={feedback.rating || 0}
                                onChange={(event, newValue) =>
                                  handleFeedbackChange(reservation._id, "rating", newValue)
                                }
                              />
                              <textarea
                                placeholder="Write your message..."
                                value={feedback.message || ""}
                                onChange={(e) =>
                                  handleFeedbackChange(reservation._id, "message", e.target.value)
                                }
                                rows={3}
                                style={{
                                  width: "100%",
                                  marginTop: "10px",
                                  padding: "8px",
                                  borderRadius: "8px",
                                  border: "1px solid #ddd",
                                  resize: "vertical",
                                  fontSize: "14px",
                                }}
                              />
                              <button
                                onClick={() => submitFeedback(reservation._id, tourGuideId)}
                                style={{
                                  marginTop: "10px",
                                  backgroundColor: "#007bff",
                                  color: "white",
                                  padding: "8px 15px",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  width: "100%",
                                }}
                              >
                                Submit Feedback
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {feedback.submitted && (
                        <div
                          style={{
                            marginTop: "15px",
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "#d1e7dd",
                            color: "#0f5132",
                            fontWeight: "600",
                          }}
                        >
                          Thank you for your feedback!
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ReservedTourGuides;
