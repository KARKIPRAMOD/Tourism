import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./Profile";
import HotelCard from "./HotelPackageCard";

const ReservedHotel = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [hotels, setHotels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    // Fetch user data
    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch(() => setError("Failed to load user data"));

    // Fetch reservations
    axios
      .get(`http://localhost:8070/HotelReservation/reservedHotels/${userId}`)
      .then((res) => {
        const reservations = res.data.reservations || [];
        setReservations(reservations);

        // Filter out reservations with missing hotel data
        const validReservations = reservations.filter(
          (reservation) => reservation.hotel !== null && reservation.hotel !== undefined
        );

        // Fetch hotel details for each valid reservation
        const hotelRequests = validReservations.map((reservation) => {
          const hotelId =
            typeof reservation.hotel === "object"
              ? reservation.hotel._id
              : reservation.hotel;

          return axios
            .get(`http://localhost:8070/hotel/get/${hotelId}`)
            .then((hotelRes) => ({
              hotelId,
              data: hotelRes.data.hotel,
            }))
            .catch((err) => {
              console.error("Error fetching hotel:", err);
              return null;
            });
        });

        Promise.all(hotelRequests).then((results) => {
          const hotelDetails = {};
          results.forEach((res) => {
            if (res) {
              hotelDetails[res.hotelId] = res.data;
            }
          });
          setHotels(hotelDetails);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reserved hotels");
        setLoading(false);
      });
  }, [userId]);

  if (!userId) {
    return <div>Please log in to see your reserved hotels.</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ProfileSidebar userData={userData} userId={userId} />
      <main style={{ flexGrow: 1, padding: "20px", marginLeft: "320px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reserved hotels...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved hotels found.</p>
        ) : (
          <div>
            <h2
              style={{
                color: "#007bff",
                fontWeight: "600",
                textAlign: "center",
                width: "fit-content",
                margin: "0 auto",
                marginBottom: "30px",
              }}
            >
              Your Reserved Hotels
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {reservations.map((reservation) => {
                if (!reservation.hotel) {
                  console.warn("Reservation missing hotel data:", reservation);
                  return null;
                }

                const hotelId =
                  typeof reservation.hotel === "object"
                    ? reservation.hotel._id
                    : reservation.hotel;

                if (!hotelId) {
                  console.warn("Invalid hotel ID for reservation", reservation);
                  return null;
                }

                const hotel = hotels[hotelId];

                if (!hotel) {
                  // Hotel data not loaded yet or missing
                  return null;
                }

                const isConfirmed = reservation.isConfirmed;

                return (
                  <HotelCard
                    key={reservation._id}
                    hotel={hotel}
                    reservation={reservation}
                    showCancel={!isConfirmed}
                    buttonStyle={{
                      backgroundColor: isConfirmed ? "green" : "red",
                      cursor: isConfirmed ? "not-allowed" : "pointer",
                    }}
                    buttonText={isConfirmed ? "Confirmed" : "Not Confirmed"}
                    buttonDisabled={isConfirmed}
                    bookedRooms={reservation.noOfRooms}
                    bookedRoomType={reservation.roomType}
                    bookedPrice={reservation.priceAtBooking}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReservedHotel;
