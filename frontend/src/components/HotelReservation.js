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

        const firstImage = res.data.hotel.photos?.[0]
          ? `http://localhost:8070/uploads/hotel_photos/${res.data.hotel.photos[0]}`
          : "https://via.placeholder.com/800x600?text=No+Image";
        setMainImage(firstImage);

        if (res.data.hotel.roomTypes && res.data.hotel.roomTypes.length > 0) {
          setSelectedRoomType(res.data.hotel.roomTypes[0].roomType);
        }
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

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
      : ["https://via.placeholder.com/800x600?text=No+Image"];

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Left side: Images and static description */}
        <div style={styles.leftContent}>
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
                  border: mainImage === url ? "3px solid #2563eb" : "2px solid #ddd",
                }}
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>

          <div style={styles.staticDescription}>
  <h3 style={styles.descriptionHeading}>About This Hotel</h3>
  <p style={styles.descriptionText}>
    Nestled in the heart of Nepal, this exquisite hotel blends modern luxury with traditional Nepali hospitality. Guests enjoy stunning mountain views, serene surroundings, and exceptional service to ensure an unforgettable stay.
  </p>

  <h4 style={styles.subHeading}>Location</h4>
  <p style={styles.descriptionText}>
    Located in the bustling city center, the hotel offers easy access to cultural landmarks, shopping districts, and vibrant local markets. The nearby airport and major transportation hubs make travel convenient.
  </p>

  <h4 style={styles.subHeading}>Facilities</h4>
  <p style={styles.descriptionText}>
    The hotel features a spa, fitness center, multiple dining options including traditional Nepalese cuisine, a swimming pool, free high-speed Wi-Fi, and complimentary breakfast to start your day right.
  </p>

  <h4 style={styles.subHeading}>Dining</h4>
  <p style={styles.descriptionText}>
    Savor authentic Nepali flavors as well as international dishes at our in-house restaurants. Enjoy rooftop dining with panoramic views or relax with a cup of coffee in the cozy lounge.
  </p>

  <h4 style={styles.subHeading}>Events & Meetings</h4>
  <p style={styles.descriptionText}>
    Equipped with modern conference rooms and event spaces, our hotel caters to business travelers and social gatherings. Our dedicated event team ensures seamless planning and execution.
  </p>

  <h4 style={styles.subHeading}>Nearby Attractions</h4>
  <p style={styles.descriptionText}>
    Explore iconic sites like Pashupatinath Temple, Boudhanath Stupa, and the ancient Durbar Squares. Adventure seekers can enjoy hiking, trekking, and river rafting within easy reach.
  </p>

  <h4 style={styles.subHeading}>Outdoor Activities</h4>
  <p style={styles.descriptionText}>
    Take advantage of guided trekking tours, mountain biking, and nature walks. Discover the breathtaking landscapes of the Himalayas with expert local guides.
  </p>

  <h4 style={styles.subHeading}>Guest Experience</h4>
  <p style={styles.descriptionText}>
    With personalized service, clean and spacious rooms, and a welcoming atmosphere, guests consistently rate the hotel highly for comfort and value. Perfect for families, couples, and solo travelers.
  </p>

  <h4 style={styles.subHeading}>Sustainability</h4>
  <p style={styles.descriptionText}>
    Our hotel is committed to sustainable practices including waste reduction, energy efficiency, and support of local communities. We strive to preserve the natural beauty and culture of Nepal.
  </p>
</div>

        </div>

        {/* Right side: Info, map, reservation */}
        <div style={styles.rightContent}>
          {/* Hotel Info Card */}
          <div style={styles.hotelCard} className="hotel-card">
            <h2 style={styles.hotelName}>{hotelDesc?.name || "Hotel Name"}</h2>

            <p style={styles.subInfo}>
              <span style={{ fontSize: "17px", fontWeight: "600" }}>🏷️ Type:</span>{" "}
              {hotelDesc?.type}
              <br />
              <span style={{ fontSize: "17px", fontWeight: "600" }}>📍 Location:</span>{" "}
              {hotelDesc?.location?.trim()}
            </p>

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
                        display: "block",
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
              <strong style={{ color: "#16a34a", fontSize: "20px" }}>
                🛏️ Available Rooms:
              </strong>{" "}
              <span style={{ fontWeight: "600" }}>{hotelDesc?.no_of_rooms}</span>
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

          {/* Map below hotel info */}
          {hotelDesc?.map && (
            <div style={styles.mapWrapper}>
              <iframe
                title="Hotel Location Map"
                src={hotelDesc.map}
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

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
              style={{ ...styles.input, width: "130px" }}
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
    flexWrap: "wrap",
  },
  leftContent: {
    flex: "1 1 55%",
    minWidth: "300px",
  },
  rightContent: {
    flex: "1 1 40%",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  mainImageWrapper: {
    marginBottom: "20px",
  },
  mainImage: {
    width: "100%",
    height: "450px",
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
    border: "2px solid transparent",
    transition: "border-color 0.3s ease",
  },
  staticDescription: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
  },
  descriptionHeading: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "16px",
    textDecoration: "underline",
    color: "#1e3a8a",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "20px",
    marginBottom: "8px",
    textDecoration: "underline",
    color: "#2563eb",
  },
  descriptionText: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#374151",
    marginBottom: "12px",
  },
  mapWrapper: {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid #000",
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
  amenityItem: {
    flex: "0 0 calc(50% - 15px)",
  },
  amenityCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    color: "#333",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "100%",
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
    width: "140px",
    display: "inline-block",
  },
  input: {
    padding: "2px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    width: "80px",
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
