import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../style_sheets/PackageDetails.module.css"; // Corrected CSS import path
import { Link } from "react-router-dom";

function PackageDetails() {
  const { packageId } = useParams(); // Get packageId from URL
  const [packageDetails, setPackageDetails] = useState(null); // Store package details
  const [mainImage, setMainImage] = useState(null); // Store main image
  const [message, setMessage] = useState(""); // Message after submitting form
  const [startDate, setStartDate] = useState(""); // Start Date for booking

  useEffect(() => {
    // Fetch the package details from the backend
    axios
      .get(`http://localhost:8070/package/get/${packageId}`)
      .then((res) => {
        setPackageDetails(res.data); // Store the fetched package data
        // Set the main image (first image in the array)
        setMainImage(
          res.data.Images && res.data.Images[0]
            ? `http://localhost:8070/${res.data.Images[0]}`
            : "https://via.placeholder.com/400x250?text=No+Image"
        );
      })
      .catch((err) => console.error("Error fetching package details:", err));
  }, [packageId]);

  // Handle the booking form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    axios
      .post("http://localhost:8070/reservePackageRouter/reserve", {
        userId,
        packageId,
        startDate,
    
      })
      .then((res) => {
        setMessage(res.data); // Display confirmation message
                    window.location.reload();

      })
      .catch((err) => console.log(err));
  };

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  // Prepare the list of image URLs
  const imageUrls =
    packageDetails.Images &&
    packageDetails.Images.length > 0
      ? packageDetails.Images.map(
          (img) => `http://localhost:8070/${img}`
        )
      : ["https://via.placeholder.com/400x250?text=No+Image"];

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Left side: Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <img
              src={mainImage}
              alt="Main Package"
              className={`${styles.mainImage} ${styles.imageHover}`}
            />
          </div>
          <div className={styles.thumbnailWrapper}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Package ${index + 1}`}
                className={styles.thumbnail}
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>
            <div className={styles.staticSection}>
            <h3>✅ What's Included?</h3>
            <ul>
              <li>🏨 Hotel accommodation</li>
              <li>🚗 Transport to and from location</li>
              <li>🧑‍🏫 Professional tour guide</li>
              <li>🍽️ Complimentary breakfast</li>
              <li>📸 Sightseeing and Photography Points</li>
            </ul>
          </div>
        </div>

        {/* Right side: Info and form */}
        <div className={styles.rightSection}>
          <div className={styles.packageCard}>
           <h2
            className={styles.packageName}
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            🧳 {packageDetails.packName}
          </h2>

          <p
            className={styles.subInfo}
            style={{
              fontSize: "1.1rem",
              color: "#34495e",
              textAlign: "center",
              marginBottom: "1rem",
              lineHeight: "1.6",
            }}
          >
            <span className={styles.label} style={{ fontWeight: "600" }}>
              🏷️ Destination:
            </span>{" "}
            {packageDetails.Destination}
          
          </p>

          <div
            className={styles.description}
            style={{
              backgroundColor: "#f4f6f8",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
                color: "#2d3436",
              }}
            >
              📝 Description:
            </p>
            <p style={{ color: "#555", lineHeight: "1.5" }}>
              {packageDetails.description || "No description available."}
            </p>
          </div>

            <div className={styles.additionalInfo}>
            <h2 className={styles.infoHeading}>📦 Package Details</h2>
            <div className={styles.infoContent}>
              <div className={styles.infoItem}><span>🕒</span> <strong>Number of Days:</strong> {packageDetails.NumOfDays}</div>
              <div className={styles.infoItem}><span>👥</span> <strong>Number of Persons:</strong> {packageDetails.NumOfPassen}</div>
              <div className={styles.infoItem}><span>🏨</span> <strong>Hotel:</strong> {packageDetails.Hotel}</div>
              <div className={styles.infoItem}><span>🚗</span> <strong>Transport:</strong> {packageDetails.Transport}</div>
              <div className={styles.infoItem}><span>🧑‍🏫</span> <strong>Tour Guide:</strong> {packageDetails.TourGuide}</div>
              <div className={styles.infoItem}><span>💰</span> <strong>Total Price:</strong> ₹{packageDetails.TotPrice}</div>
            </div>
          </div>

          </div>

         <form
          onSubmit={handleFormSubmit}
          className={styles.form}
          style={{
            backgroundColor: "#f8f9fa",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
           
              color: "#2c3e50",
              textAlign: "center",
            }}
          >
            📝 Book This Package
          </h3>

          <label className={styles.label} style={{ fontWeight: "500", color: "#34495e" }}>
            📅 Start Date
          </label>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            required
            className={styles.input}
            style={{
              padding: "0.6rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            className={styles.button}
            style={{
              padding: "0.75rem",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#27ae60")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2ecc71")}
          >
            🚀 Book Now
          </button>
        </form>

          {/* Confirmation Message */}
          {message && <div className={styles.message}>{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
