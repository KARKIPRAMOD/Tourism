import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function HotelReservation() {
  const location = useLocation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [noOfPersons, setNumberOfPersons] = useState();
  const [noOfRooms, setNumberOfRooms] = useState();
  const [message, setMessage] = useState();
  const [hotelDesc, setHotelDesc] = useState();
  const [mainImage, setMainImage] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const { hotelId } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8070/hotel/get/${hotelId}`)
      .then((res) => {
        setHotelDesc(res.data.hotel);

        // Set first image or placeholder
        const firstImage = res.data.hotel.photos?.[0]
          ? `http://localhost:8070/uploads/hotel_photos/${res.data.hotel.photos[0]}`
          : "https://via.placeholder.com/400x250?text=No+Image";
        setMainImage(firstImage);

        // Set default selected room type to first available if exists
        if (res.data.hotel.roomTypes && res.data.hotel.roomTypes.length > 0) {
          setSelectedRoomType(res.data.hotel.roomTypes[0].roomType);
        }
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  // Get price of currently selected room type
  const getPriceForSelectedRoomType = () => {
    if (!hotelDesc?.roomTypes) return 0;
    const room = hotelDesc.roomTypes.find(
      (r) => r.roomType === selectedRoomType
    );
    return room ? room.price : 0;
  };

  const handleFormSubmit = () => {
    if (!selectedRoomType) {
      alert("Please select a room type");
      return;
    }

    const priceAtBooking = getPriceForSelectedRoomType();

    axios
      .post("http://localhost:8070/HotelReservation/reserve", {
        user: userId,
        hotel: hotelId,
        startDate,
        endDate,
        noOfPersons,
        noOfRooms,
        roomType: selectedRoomType,
        priceAtBooking,
      })
      .then((res) => {
        setMessage(res.data.message || "Reservation successful");

        // Update hotel room count
        axios
          .put(`http://localhost:8070/hotel/update/${hotelId}`, {
            no_of_rooms: hotelDesc.no_of_rooms - noOfRooms,
          })
          .then(() => {
            console.log("Hotel room count updated successfully");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to make reservation");
      });
  };

  const imageUrls =
    hotelDesc?.photos?.length > 0
      ? hotelDesc.photos.map(
          (photo) => `http://localhost:8070/uploads/hotel_photos/${photo}`
        )
      : ["https://via.placeholder.com/400x250?text=No+Image"];

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Left side: Images */}
        <div style={styles.imageSection}>
          <div style={styles.mainImageWrapper}>
            <img src={mainImage} alt="Main Hotel" style={styles.mainImage} />
          </div>
          <div style={styles.thumbnailWrapper}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Hotel ${index + 1}`}
                style={{
                  ...styles.thumbnail,
                  border: mainImage === url ? "2px solid #2563eb" : "none",
                }}
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>

          {/* Map Embed */}
          {hotelDesc?.map && (
            <div
              style={{
                marginTop: "20px",
                borderRadius: "12px",
                overflow: "hidden",
                   border: "solid black 2px"
              }}
            >
              <iframe
                title="Hotel Location Map"
                src={hotelDesc.map}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                                     

              />
            </div>
          )}
        </div>

        {/* Right side: Info and form */}
        <div style={styles.rightSection}>
          <div style={styles.hotelCard} className="hotel-card">
            <h2 style={styles.hotelName}>{hotelDesc?.name || "Hotel Name"}</h2>

            <p style={styles.subInfo}>
              <span style={{ fontSize: "17px", fontWeight: "600" }}>🏷️ Type:</span>{" "}
              {hotelDesc?.type}
              <br />
              <span style={{ fontSize: "17px", fontWeight: "600" }}>📍 Location:</span>{" "}
              {hotelDesc?.location?.trim()}
            </p>

            {/* Display all room types and prices */}
            <div style={{ marginTop: "10px", marginBottom: "15px" }}>
              <strong style={{ fontSize: "18px", color: "#2563eb" }}>
                Available Room Types:
              </strong>
              <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                {hotelDesc?.roomTypes && hotelDesc.roomTypes.length > 0 ? (
                  hotelDesc.roomTypes.map((room, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "16px",
                        marginBottom: "8px",
                        display: "block", // explicitly force block display
                      }}
                    >
                      {room.roomType} - Rs. <strong>{room.price}</strong> / night
                    </li>
                  ))
                ) : (
                  <li>No room types available</li>
                )}
              </ul>
            </div>

            <p style={{ fontSize: "18px" }}>
              <strong style={{ color: "#16a34a", fontSize: "20px" }}>🛏️ Available Rooms:</strong>{" "}
              <span style={{ fontWeight: "600" }}>{hotelDesc?.no_of_rooms}</span>
            </p>

            <p style={styles.description}>
              {hotelDesc?.description || "No description available."}
            </p>

            <div style={styles.extraInfo}>
              <h3 style={styles.extraHeading}>📋 Hotel Policies & Amenities</h3>
              <ul style={styles.amenitiesList}>
                <li style={styles.amenityItem}>
                  <span style={styles.amenityCard}>🕐 Check-in: 12:00 PM</span>
                </li>
                <li style={styles.amenityItem}>
                  <span style={styles.amenityCard}>🕛 Check-out: 11:00 AM</span>
                </li>
                <li style={styles.amenityItem}>
                  <span style={styles.amenityCard}>🧼 Daily housekeeping</span>
                </li>
                <li style={styles.amenityItem}>
                  <span style={styles.amenityCard}>🚗 Parking available</span>
                </li>
                <li style={styles.amenityItem}>
                  <span style={styles.amenityCard}>🍽️ Complimentary breakfast</span>
                </li>
                <li style={styles.amenityItem}>
                  <span style={styles.amenityCard}>📶 Free Wi-Fi</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
            style={styles.form}
          >
            {message && <div style={styles.message}>{message}</div>}

            <label style={styles.label}>📅 From</label>
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>📅 To</label>
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>👥 Persons</label>
            <input
              type="number"
              min="1"
              onChange={(e) => setNumberOfPersons(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>🚪 Rooms</label>
            <input
              type="number"
              min="1"
              onChange={(e) => setNumberOfRooms(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>🛏️ Room Type</label>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              required
              style={{ ...styles.input, width: "150px" }}
            >
              {hotelDesc?.roomTypes?.map((room, idx) => (
                <option key={idx} value={room.roomType}>
                  {room.roomType} - Rs. {room.price}
                </option>
              ))}
            </select>

            <button type="submit" style={styles.button} className="book-btn">
              Book Now
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
          .hotel-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
          }
          .book-btn:hover {
            background-color: #1d4ed8;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    margin: "3rem 5rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  mainContent: {
    display: "flex",
    gap: "40px",
    alignItems: "flex-start",
  },
  imageSection: {
    flex: 1,
  },
  mainImageWrapper: {
    marginBottom: "20px",
  },
  mainImage: {
    width: "100%",
    maxWidth: "800px",
    height: "600px",
    borderRadius: "12px",
    objectFit: "cover",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  thumbnailWrapper: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  thumbnail: {
    width: "100px",
    height: "70px",
    borderRadius: "8px",
    objectFit: "cover",
    cursor: "pointer",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  hotelCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "default",
  },
  hotelName: {
    fontSize: "34px",
    marginBottom: "20px",
    color: "#111827",
    fontWeight: "800",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "10px",
    textAlign: "center",
  },
  subInfo: {
    color: "#6b7280",
    fontSize: "16px",
    marginBottom: "18px",
    fontWeight: "500",
  },
  description: {
    marginTop: "25px",
    color: "#374151",
    fontSize: "16px",
    lineHeight: 1.8,
    fontWeight: "400",
  },
  extraInfo: {
    marginTop: "20px",
  },
  extraHeading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  amenitiesList: {
    listStyle: "none",
    paddingLeft: "0",
    margin: "0",
    color: "#4b5563",
    fontSize: "15px",
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
  },
  amenityCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    flex: "0 0 calc(50% - 15px)",
    color: "#333",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "calc(50% - 15px)",
    boxSizing: "border-box",
  },
  form: {
    backgroundColor: "#f9fafb",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
  },
  label: {
    fontWeight: "bold",
    color: "#374151",
    width: "150px",
    display: "inline-block",
  },
  input: {
    padding: "5px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    width: "100px",
    display: "inline-block",
  },
  button: {
    backgroundColor: "red",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  message: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default HotelReservation;
