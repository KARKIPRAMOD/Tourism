import axios from "axios";
import { useState } from "react";
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
  const { hotelId } = useParams();

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

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:8070/HotelReservation/reserve", {
        user: localStorage.getItem("userId"),
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
          <label>Description</label>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            {message && <div>{message}</div>}
            <label for="lastname">Start Date: </label>
            <input
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <br />
            <label for="lastname">End Date: </label>
            <input
              type="date"
              name="endDatet"
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <br />
            <label for="email">Number of Persons: </label>
            <input
              type="text"
              name="numberOfPersons"
              onChange={(e) => setNumberOfPersons(e.target.value)}
              required
            />
            <br />
            <label for="password">Number of Rooms: </label>
            <input
              type="text"
              name="rooms"
              onChange={(e) => setNumberOfRooms(e.target.value)}
              required
            />
            <br />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HotelReservation;
