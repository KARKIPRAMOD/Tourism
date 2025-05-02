import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Make sure to import styles
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function HotelReservation() {
  const hotelImage = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyp3ioN6GTK-DidA7sNCjqUmQ1Bog1c7fCw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXyENPbvq8vEUBtvSO-3dYBOT6Dmd08-MSwu7kDAOgIourx98PCsy346QTEyxyjFnrWg4&usqp=CAU",
    "https://media.licdn.com/dms/image/v2/D5612AQFzAAoTpXKvgw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1706185857400?e=2147483647&v=beta&t=owEbaQHl3G9ZfjWEV7MTAtd5dfLGfcEiL9Ej475bFvE",
  ];
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [noOfPersons, setNumberOfPersons] = useState();
  const [noOfRooms, setNumberOfRooms] = useState();
  const [message, setMessage] = useState();
  const [hotelDesc, setHotelDesc] = useState();
  const { hotelId } = useParams();
  const userId = localStorage.getItem("userId");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8070/hotel/get/${hotelId}`)
      .then((res) => {
        console.log(res.data.hotel);
        setHotelDesc(res.data.hotel);
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:8070/HotelReservation/reserve", {
        user: userId,
        hotel: hotelId,
        startDate: startDate,
        endDate: endDate,
        noOfPersons: noOfPersons,
        noOfRooms: noOfRooms,
      })
      .then((res) => {
        setMessage(res.data);
        console.log(message);
      })
      .catch((err) => console.log(err));
  };

  const imageUrl = hotelDesc?.photos?.length
    ? `http://localhost:8070/uploads/hotel_pictures/${hotelDesc.photos[0]}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div
      style={{
        marginLeft: "5rem",
        marginRight: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <label
          style={{
            fontWeight: "700",
            fontSize: "34px",
            color: "rgb(68, 104, 226)",
          }}
        >
          Reservation Hotel
        </label>
      </div>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
        {hotelImage.map((value, index) => (
          <div
            key={index}
            style={{
              height: "20rem",
            }}
          >
            <img
              src={value}
              alt={`Hotel ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <div
            style={{
              maxWidth: "500px",
              margin: "auto",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <img
              src={imageUrl}
              alt={hotelDesc.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "20px" }}>
              <h2 style={{ margin: 0, color: "#1f2937" }}>{hotelDesc.name}</h2>
              <p
                style={{ color: "#6b7280", fontSize: "14px", margin: "6px 0" }}
              >
                {hotelDesc.type} | {hotelDesc.location.trim()}
              </p>
              <p
                style={{ margin: "10px 0", fontSize: "16px", color: "#374151" }}
              >
                <strong>Price:</strong> Rs. {hotelDesc.price} / night
              </p>
              <p
                style={{ margin: "6px 0", fontSize: "14px", color: "#4b5563" }}
              >
                <strong>Available Rooms:</strong> {hotelDesc.no_of_rooms}
              </p>
              <p
                style={{
                  marginTop: "12px",
                  color: "#374151",
                  lineHeight: "1.5",
                }}
              >
                {hotelDesc.description}
              </p>
            </div>
          </div>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
            style={{
              maxWidth: "400px",
              margin: "auto",
              padding: "20px",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {message && (
              <div
                style={{
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  textAlign: "center",
                }}
              >
                {message}
              </div>
            )}

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="startDate" style={labelStyle}>
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                onChange={(e) => setStartDate(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="endDate" style={labelStyle}>
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                onChange={(e) => setEndDate(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="numberOfPersons" style={labelStyle}>
                Number of Persons:
              </label>
              <input
                type="text"
                name="numberOfPersons"
                onChange={(e) => setNumberOfPersons(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="rooms" style={labelStyle}>
                Number of Rooms:
              </label>
              <input
                type="text"
                name="rooms"
                onChange={(e) => setNumberOfRooms(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "bold",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

export default HotelReservation;
