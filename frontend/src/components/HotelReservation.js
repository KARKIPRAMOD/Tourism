import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
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
  const { hotelId } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8070/hotel/get/${hotelId}`)
      .then((res) => {
        setHotelDesc(res.data.hotel);
        const firstImage = res.data.hotel.photos?.[0]
          ? `http://localhost:8070/uploads/hotel_photos/${res.data.hotel.photos[0]}`
          : "https://via.placeholder.com/400x250?text=No+Image";
        setMainImage(firstImage);
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:8070/HotelReservation/reserve", {
        user: userId,
        hotel: hotelId,
        startDate,
        endDate,
        noOfPersons,
        noOfRooms,
      })
      .then((res) => {
        setMessage(res.data);

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
      .catch((err) => console.log(err));
  };

  const imageUrls =
    hotelDesc?.photos?.length > 0
      ? hotelDesc.photos.map((photo) => `http://localhost:8070/uploads/hotel_photos/${photo}`)
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
                style={{ ...styles.thumbnail, border: mainImage === url ? "2px solid #2563eb" : "none" }}
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>
        </div>

        {/* Right side: Info and form */}
        <div style={styles.rightSection}>
          <div style={styles.hotelCard} className="hotel-card">
            <h2 style={styles.hotelName}>{hotelDesc?.name || "Hotel Name"}</h2>

            <p style={styles.subInfo}>
              <span style={{ fontSize: "17px", fontWeight: "600" }}>🏷️ Type:</span> {hotelDesc?.type}<br />
              <span style={{ fontSize: "17px", fontWeight: "600" }}>📍 Location:</span> {hotelDesc?.location?.trim()}
            </p>

            <div style={{ marginTop: "10px", marginBottom: "15px" }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                <strong style={{ color: "#2563eb", fontSize: "20px" }}>💰 Price:</strong>{" "}
                <span style={{ fontWeight: "600" }}>Rs. {hotelDesc?.price} / night</span>
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong style={{ color: "#16a34a", fontSize: "20px" }}>🛏️ Available Rooms:</strong>{" "}
                <span style={{ fontWeight: "600" }}>{hotelDesc?.no_of_rooms}</span>
              </p>
            </div>

            <p style={styles.description}>{hotelDesc?.description || "No description available."}</p>
            <div style={styles.extraInfo}>
              <h3 style={styles.extraHeading}>📋 Hotel Policies & Amenities</h3>
              <ul style={styles.amenitiesList}>
                <li style={styles.amenityItem}><span style={styles.amenityCard}>🕐 Check-in: 12:00 PM</span></li>
                <li style={styles.amenityItem}><span style={styles.amenityCard}>🕛 Check-out: 11:00 AM</span></li>
                                <li style={styles.amenityItem}><span style={styles.amenityCard}>🧼 Daily housekeeping</span></li>

                  <li style={styles.amenityItem}><span style={styles.amenityCard}>🚗 Parking available</span></li>
                <li style={styles.amenityItem}><span style={styles.amenityCard}>🍽️ Complimentary breakfast</span></li>
                <li style={styles.amenityItem}><span style={styles.amenityCard}>📶 Free Wi-Fi</span></li>
              </ul>



            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
            style={styles.form}
          >
            {message && <div style={styles.message}>{message}</div>}

            <label style={styles.label}>📅From</label>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} required style={styles.input} />

            <label style={styles.label}>📅 To</label>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} required style={styles.input} />

            <label style={styles.label}>👥 Persons</label>
            <input type="number" min="1" onChange={(e) => setNumberOfPersons(e.target.value)} required style={styles.input} />

            <label style={styles.label}>🚪 Rooms</label>
            <input type="number" min="1" onChange={(e) => setNumberOfRooms(e.target.value)} required style={styles.input} />

            <button type="submit" style={styles.button} className="book-btn">Book Now</button>
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
  header: {
    fontSize: "36px",
    textAlign: "center",
    color: "#3b82f6",
    marginBottom: "30px",
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
    flexWrap: "wrap", // allows wrapping to the next row
    gap: "25px", // consistent gap between items (both horizontally and vertically)
  },
  amenityCard: {
    backgroundColor: "#fff", // card background
    borderRadius: "8px", // rounded corners
    padding: "12px", // inner padding
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // card shadow effect
    fontWeight: "bold", // bold text
    flex: "0 0 calc(50% - 15px)", // each card takes 50% of the row width minus the gap
    color: "#333", // text color
    textOverflow: "ellipsis", // handles overflowing text
    whiteSpace: "nowrap", // prevents text from wrapping into a new line
    overflow: "hidden", // ensures no text overflows outside the card
    maxWidth: "calc(50% - 15px)", // ensures card width remains fixed
    boxSizing: "border-box", // includes padding and border in the element's total width and height
  },
   form: {
    backgroundColor: "#f9fafb",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexWrap: "wrap", // still allows wrapping if screen is small
    gap: "20px", // space between fields
    justifyContent: "flex-start", // aligns items to the left
  },
  label: {
    fontWeight: "bold",
    color: "#374151",
    width: "150px", // fix label width to make it align well
    display: "inline-block", // ensures the label stays in the same row
  },
  input: {
    padding: "5px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    width: "100px", // fixed input width to align with labels
    display: "inline-block", // ensures the input stays in the same row
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
