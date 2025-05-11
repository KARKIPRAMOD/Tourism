import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile";
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
      .get(`http://localhost:8070/tourguideReservation/reservedTourGuides/${userId}`)
      .then((response) => {
        const reservations = response.data;
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <ProfileSidebar userData={userData} userId={userId} />
      <main style={{ flexGrow: 1, padding: "20px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reserved tour guides...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved tour guides found.</p>
        ) : (
          <div>
            <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Your Reserved Tour Guides</h2>
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
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "transform 0.3s",
                    }}
                  >
                    <img
                      src={
                        guide?.guide?.image
                          ? `http://localhost:8070/uploads/tourguide_pictures/${guide.guide.image}`
                          : "https://via.placeholder.com/300x200"
                      }
                      alt={guide?.guide?.fullName}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "16px" }}>
                      <h4
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#2e2e2e",
                          textTransform: "capitalize",
                        }}
                      >
                        {guide?.guide?.fullName || "Loading..."}
                      </h4>
                      <p style={{ color: "#555", fontSize: "14px", marginBottom: "8px" }}>
                        <strong>Age:</strong> {guide?.guide?.age || "N/A"}
                      </p>
                      <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.4" }}>
                        <strong>From:</strong> {new Date(reservation.startDate).toLocaleDateString()} <br />
                        <strong>To:</strong> {new Date(reservation.endDate).toLocaleDateString()}
                      </p>
                      <p>For : NRP <strong> {guide?.guide?.amount } /Day</strong></p>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          backgroundColor: reservation.isConfirmed ? "#e6fcf5" : "#fff4e6",
                          color: reservation.isConfirmed ? "#0ca678" : "#e8590c",
                          fontWeight: "600",
                          fontSize: "13px",
                          border: `1px solid ${reservation.isConfirmed ? "#96f2d7" : "#ffc078"}`,
                        }}
                      >
                        {reservation.isConfirmed ? "✔ Confirmed" : "⏳ Unconfirmed"}
                      </div>
                    </div>


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

export default ReservedTourGuides;
