import React from "react";

const PackageReservation = ({ pkg, reservation }) => {
  const imageUrl = pkg?.Images?.[0]
  ? `http://localhost:8070/${pkg.Images[0].replace(/\\/g, "/")}`
  : "https://via.placeholder.com/300x200?text=No+Image";


  const start = new Date(reservation.startDate).toLocaleDateString("en-US");

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
        alt={pkg?.packageName || "Package"}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div style={{ padding: "16px" }}>
        <h5 style={{ margin: 0 }}>{pkg?.packName || "Loading..."}</h5>
        <p style={{ color: "#666", fontSize: "14px" }}>
          {pkg?.Destination || "Unknown Location"} <br />
          Date: {start}
          <br />
          Total People: {pkg?.NumOfPassen}
          <br />
          Total Days: {pkg?.NumOfDays}
        </p>

        {/* Centered confirmation badge */}
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
              border: `1px solid ${
                reservation.isConfirmed ? "#96f2d7" : "#ffc078"
              }`,
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

const tagStyle = (bgColor, color) => ({
  backgroundColor: bgColor,
  color: color,
  fontSize: "12px",
  padding: "4px 10px",
  borderRadius: "8px",
});



export default PackageReservation;
