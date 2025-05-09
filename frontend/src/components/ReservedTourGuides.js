import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile"; // Import the sidebar that contains user profile
import { Link } from "react-router-dom";

const ReservedTourGuides = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [tourGuideDetails, setTourGuideDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      });

    axios
      .get(
        `http://localhost:8070/tourguideReservation/reservedTourGuides/${userId}`
      )
      .then((response) => {
        const reservations = response.data;
        console.log(reservations);
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
            .catch((err) => {
              console.error("Error fetching tour guide details:", err);
              setError("Failed to load tour guide details");
            });
        });

        Promise.all(tourGuideRequests).then(() => {
          setTourGuideDetails(details);
        });
      })
      .catch((error) => {
        console.error("Error fetching reserved tour guides:", error);
        setError("Failed to load reserved tour guides");
        setLoading(false);
      });
  }, [userId]);

  if (!userId) {
    return <div>You haven't logged in to your account.</div>;
  }

  const handleConfirmReservation = (reservationId) => {
    axios
      .put(
        `http://localhost:8070/tourguideReservation/confirm/${reservationId}`
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
      .catch((error) => {
        alert("Error confirming reservation.");
        console.error("Error confirming reservation:", error);
      });
  };

  const handleRejectReservation = (reservationId) => {
    axios
      .delete(
        `http://localhost:8070/tourguideReservation/delete/${reservationId}`
      )
      .then((response) => {
        alert("Reservation rejected!");
        setReservations(
          reservations.filter(
            (reservation) => reservation._id !== reservationId
          )
        );
      })
      .catch((error) => {
        alert("Error rejecting reservation.");
        console.error("Error rejecting reservation:", error);
      });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ProfileSidebar userData={userData} userId={userId} />
      <main style={{ flexGrow: 1, padding: "20px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reserved tour guides...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved tour guides found.</p>
        ) : (
          <div>
            <h3>Your Reserved Tour Guides</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {reservations.map((reservation) => {
                const tourGuideId =
                  typeof reservation.tourguide === "object"
                    ? reservation.tourguide._id
                    : reservation.tourguide;
                const guide = tourGuideDetails[tourGuideId];
                return (
                  <div
                    key={reservation._id}
                    style={{
                      width: "300px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={
                        `http://localhost:8070/uploads/tourguide_pictures/${guide?.guide.image}` ||
                        "https://media.istockphoto.com/id/1369171053/photo/group-of-sporty-people-walks-in-mountains-at-sunset-with-backpacks.jpg?s=612x612&w=0&k=20&c=ajQuWt2YRWd0FPaCpdKz2Tt3WX2NI1ddeZjf8HIxlwU="
                      }
                      alt={guide?.fullName}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "16px" }}>
                      <h5 style={{ margin: 0 }}>
                        {guide?.guide?.fullName || "Loading..."}
                      </h5>
                      <p style={{ color: "#666", fontSize: "14px" }}>
                        Age: {guide?.guide?.age || "Loading..."} <br />
                        Date:{" "}
                        {new Date(
                          reservation.startDate
                        ).toLocaleDateString()} -{" "}
                        {new Date(reservation.endDate).toLocaleDateString()}
                      </p>
                      <h5 style={{ margin: 0 }}>
                        {reservation.isConfirmed ? "Confirmed" : "Unconfirmed"}
                      </h5>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={tagStyle("orange")}>Family</span>
                        <span style={tagStyle("green")}>
                          {guide?.location || "Location"}
                        </span>
                      </div>
                      {reservation.isConfirmed ? (
                        <span
                          style={{
                            color: "green",
                            fontWeight: "bold",
                          }}
                        ></span>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleConfirmReservation(reservation._id)
                            }
                            style={editButtonStyle}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleRejectReservation(reservation._id)
                            }
                            style={editButtonStyle}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const tagStyle = (color) => ({
  backgroundColor: color === "orange" ? "#FFE8CC" : "#D3F9D8",
  color: color === "orange" ? "#FF922B" : "#37B24D",
  fontSize: "12px",
  padding: "2px 8px",
  borderRadius: "8px",
});

const editButtonStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  backgroundColor: "#F1F3F5",
  border: "1px solid #CED4DA",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};

export default ReservedTourGuides;
