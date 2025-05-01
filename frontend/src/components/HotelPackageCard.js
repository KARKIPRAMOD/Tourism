const HotelCard = ({ hotel, reservation }) => {
  const imageUrl = hotel?.photos?.[0]
    ? `http://localhost:8070/uploads/hotel_photos/${hotel.photos[0]}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  const start = new Date(reservation.fromDate).toLocaleDateString("en-US");
  const end = new Date(reservation.toDate).toLocaleDateString("en-US");
  console.log(reservation);
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
          {hotel?.location || "Unknown Location"} <br />
          <p>{hotel.description}</p>
          Date: {start} - {end}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={tagStyle("#fef9c3", "#ca8a04")}>Hotel</span>
          <span style={tagStyle("#dcfce7", "#16a34a")}>Reserved</span>
        </div>
        <button style={editButtonStyle}>Cancel</button>
      </div>
    </div>
  );
};

const tagStyle = (bgColor, color) => ({
  backgroundColor: bgColor,
  color: color,
  fontSize: "12px",
  padding: "4px 10px",
  borderRadius: "8px",
});

const editButtonStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};

export default HotelCard;
