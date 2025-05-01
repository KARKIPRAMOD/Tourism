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

    axios
      .get(`http://localhost:8070/user/${userId}`)
      .then((res) => setUserData(res.data.user))
      .catch(() => setError("Failed to load user data"));

    axios
      .get(`http://localhost:8070/HotelReservation/reservedHotels/${userId}`)
      .then((res) => {
        const reservations = res.data.reservations || [];
        setReservations(reservations);

        const hotelRequests = reservations.map((reservation) => {
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
      <main style={{ flexGrow: 1, padding: "20px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Loading reserved hotels...</p>
        ) : reservations.length === 0 ? (
          <p>No reserved hotels found.</p>
        ) : (
          <div>
            <h3>Your Reserved Hotels</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {reservations.map((reservation) => {
                const hotelId =
                  typeof reservation.hotel === "object"
                    ? reservation.hotel._id
                    : reservation.hotel;

                if (!hotelId) {
                  console.warn("Invalid hotel ID for reservation", reservation);
                  return null;
                }

                const hotel = hotels[hotelId];
                console.log(hotel);
                return (
                  <HotelCard
                    key={reservation._id}
                    hotel={hotel}
                    reservation={reservation}
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
