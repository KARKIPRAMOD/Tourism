import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile"; // Import the sidebar that contains user profile

const ReservedTourGuides = ({ userId }) => {
  const [reservations, setReservations] = useState([]); // To store the user's reserved tour guides
  const [tourGuideDetails, setTourGuideDetails] = useState({}); // To store details of the tour guides
  const [loading, setLoading] = useState(true); // Loading state for reserved tour guides
  const [error, setError] = useState(""); // Error state
  const [userData, setUserData] = useState(null); // To store the user data for the profile sidebar

  useEffect(() => {
    if (!userId) return;

    // Fetch the user data (user profile) for the sidebar
    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      });

    // Fetch the reserved tour guides for the user
    axios
      .get(
        `http://localhost:8070/tourguideReservation/reservedTourGuides/${userId}`
      )
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

          console.log("Fetching tour guide with ID:", tourGuideId);

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

        // Wait for all requests to complete
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Profile Sidebar */}
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
            <ul className="list-group">
              {reservations.map((reservation) => {
                const tourGuideId =
                  typeof reservation.tourguide === "object"
                    ? reservation.tourguide._id
                    : reservation.tourguide;
                const guide = tourGuideDetails[tourGuideId];

                return (
                  <li key={reservation._id} className="list-group-item">
                    <p>
                      <strong>Tour Guide:</strong>{" "}
                      {guide?.fullName || "Loading..."} <br />
                      <strong>Age:</strong> {guide?.age || "Loading..."} <br />
                      <strong>Date:</strong>{" "}
                      {new Date(reservation.startDate).toLocaleDateString()} -{" "}
                      {new Date(reservation.endDate).toLocaleDateString()}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReservedTourGuides;
