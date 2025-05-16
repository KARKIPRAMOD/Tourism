const HotelCard = ({ hotel, reservation }) => {
  const imageUrl = hotel?.photos?.[0]
    ? `http://localhost:8070/uploads/hotel_photos/${hotel.photos[0]}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  const start = new Date(reservation.fromDate).toLocaleDateString("en-US");
  const end = new Date(reservation.toDate).toLocaleDateString("en-US");

  return (
    <div
      style={{
        width: "300px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={imageUrl}
        alt={hotel?.name || "Hotel"}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div style={{ padding: "16px" }}>
        <h5 style={{ margin: 0 }}>{hotel?.name || "Loading..."}</h5>
        <p style={{ color: "#666", fontSize: "14px" }}>
          {hotel?.location || "Unknown Location"}
        </p>
        <p>{hotel.description}</p>
        <p>Date: {start} - {end}</p>
          <div style={{ marginTop: "10px", fontSize: "14px", fontWeight: "600" }}>
          <div>Rooms Booked: {reservation.noOfRooms}</div>
          <div>Room Type: {reservation.roomType}</div>
          <div>Price at Booking: Rs. {reservation.priceAtBooking} / night</div>
        </div>

        {/* Confirmation badge */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
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
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {reservation.isConfirmed ? "✔ Confirmed" : "⏳ Unconfirmed"}
        </div>
</div>

      </div>
    </div>
  );
};

export default HotelCard;
