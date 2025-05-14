/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styleHome from "../style_sheets/Home.module.css";
const styles = {
  prettyGuideReportContainer: {
    backgroundColor: "#f4f4f9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "3rem 5rem",
    borderRadius: "15px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
  prettyGuideReportTitle: {
    textAlign: "center",
    color: "#333",
    marginBottom: "40px",
    fontSize: "2.8rem",
    fontWeight: "600",
    letterSpacing: "1px",
  },
  prettyGuideCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
  },
  prettyGuideCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    cursor: "pointer",
  },
  prettyGuideCardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  prettyCardHeader: {
    backgroundColor: "#009688",
    color: "white",
    padding: "25px",
    textAlign: "center",
    fontSize: "1.6rem",
    fontWeight: "500",
  },
  prettyCardBody: {
    padding: "25px",
    backgroundColor: "#fafafa",
    color: "#555",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  prettyCardBodyP: {
    marginBottom: "12px",
    color: "#777",
  },
  prettyPrintButton: {
    padding: "15px 30px",
    borderRadius: "30px",
    fontWeight: "600",
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    backgroundColor: "#28a745",
    color: "white",
    marginTop: "20px",
    width: "100%",
    textAlign: "center",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  modalCloseBtn: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    color: "#999",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "80%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-out",
  },
  modalCloseBtn: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "transparent",
    border: "none",
    fontSize: "1.8rem",
    color: "#999",
    cursor: "pointer",
  },
  modalTitle: {
    fontSize: "2rem",
    color: "#007bff",
    marginBottom: "20px",
    fontWeight: "600",
  },
  modalDescription: {
    marginBottom: "25px",
    fontSize: "1.1rem",
    color: "#444",
  },
  datePickerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  datePickerGroup: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  icon: {
    fontSize: "1.4rem",
    color: "#007bff",
  },
  label: {
    fontWeight: "600",
    fontSize: "1rem",
    color: "#444",
  },
  datePicker: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    color: "#555",
    width: "100%",
    maxWidth: "220px",
  },
  confirmButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "30px",
  },
  confirmButtonHover: {
    backgroundColor: "#218838",
  },
};


export default class GuideReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourguides: [],
      hoveredIndex: null,
      showModal: false,
      selectedGuide: null,
      dateFrom: null,
      dateTo: null,
    };
  }

  componentDidMount() {
    this.retriveTourguides();
      this.fetchReservations();  // Call fetchReservations here

  }
  

  retriveTourguides() {
    axios
      .get("http://localhost:8070/tourguide/")
      .then((res) => {
        console.log(" Status:", res.status);
        console.log(" Payload:", res.data);

        if (res.data.success) {
          this.setState({
            tourguides: res.data.guides,
          });
        } else {
          console.warn("success");
        }
      })
      .catch((err) => {
        console.error(" Error fetching tour guides:", err);
        if (err.response) {
          console.error(" Status:", err.response.status);
          console.error(" Response:", err.response.data);
        }
      });
  }

fetchReservations() {
  fetch('http://localhost:8070/tourguideReservation/') // Assuming you're calling an API endpoint
    .then(response => response.json())
    .then(data => {
      console.log('Fetched reservations:', data);
      this.setState({ reservations: data }, () => {
        // Call compareTourguideReservations only after state is updated
        this.compareTourguideReservations();
      });
    })
    .catch(error => console.error('Error fetching reservations:', error));
}



compareTourguideReservations = () => {
  const { tourguides, reservations } = this.state;

  if (!reservations || !Array.isArray(reservations)) {
    console.error("Reservations data is invalid or not an array", reservations);
    return;
  }

  reservations.forEach((reservation) => {
    if (!reservation || !reservation.tourguide || !reservation._id) {
      console.warn(`Invalid reservation data for reservation ID: ${reservation._id}`);
      return;
    }

    console.log("Reservation ID:", reservation._id);
    console.log("User ID:", reservation.user);
    console.log("Tourguide ID:", reservation.tourguide);
    console.log("Start Date:", reservation.startDate);
    console.log("End Date:", reservation.endDate);
    console.log("Is Confirmed:", reservation.isConfirmed);

    // Ensure comparison is done based on tourguide._id
    const reservedTourguide = tourguides.find(
      (tourguide) => tourguide._id.toString() === reservation.tourguide._id.toString()
    );

    if (reservedTourguide) {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);
      this.setState({ dateFrom: startDate, dateTo: endDate });

      console.log(`Start Date: ${startDate.toISOString()}`);
      console.log(`End Date: ${endDate.toISOString()}`);
    } else {
      console.warn(`No matching tourguide found for reservation ID: ${reservation._id}`);
    }
  });
};


  handleMouseEnter = (index) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  openModal = (guide) => {
    this.setState({
      showModal: true,
      selectedGuide: guide,
      dateFrom: null,
      dateTo: null,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedGuide: null,
    });
  };

  handleReserve = (guideName, guideId) => {
    const { dateFrom, dateTo } = this.state;
    const userId = localStorage.getItem("userId"); // Extract userId from localStorage

    if (dateFrom && dateTo && dateFrom <= dateTo) {
      const payload = {
        userId,
        tourguideId: guideId,
        startDate: dateFrom,
        endDate: dateTo,
      };
      console.log("Payload:", payload);
      // Send POST request to reserve the guide
      axios
        .post(`http://localhost:8070/tourguideReservation/reserve`, payload)
        .then((response) => {
          if (response.data.message === "Reservation successful") {
            alert(
              `Reserved guide: ${guideName}\nFrom: ${dateFrom.toLocaleDateString()} To: ${dateTo.toLocaleDateString()}`
            );
          } else {
            alert(response.data.message); // Show the error message
          }
        })
        .catch((error) => {
          console.error("Error reserving guide:", error);
          alert("Failed to reserve guide. Please try again later.");
        });
    } else {
      alert("Invalid date selection. Please choose valid from-to dates.");
    }
  };

  render() {
    const {
      tourguides,
      hoveredIndex,
      showModal,
      selectedGuide,
      dateFrom,
      dateTo,
      reservations = [],
    } = this.state;
   

    return (
      <>
       
         <div className={styleHome.container}>
          <img 
            src={"https://www.travels2nepal.com/images/banner2.jpg"}
            className={styleHome.img}
          />
          <div className={styleHome.layer}>
            <div className={styleHome.centered}>
              <div className={styleHome.headerTxt}>Our Amazing Tour Guides</div>
              <div className={styleHome.sloganTxt}>
                "Stop worrying about the potholes in the road and enjoy the journey."
              </div>
            </div>
          </div>
        </div>
       <div style={styles.prettyGuideReportContainer}>
      <div style={styles.prettyGuideCardGrid}>
        {tourguides?.map((tourguide, index) => {
          return (
            <div
              key={index}
              style={{
                borderRadius: "6px",
                height: "auto",
                boxShadow:
                  "9px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
              }}
              className="transition-shadow rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-red-50"
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={this.handleMouseLeave}
            >
              {/* Top image */}
              <img
                src={
                  `http://localhost:8070/uploads/tourguide_pictures/${tourguide.image}` ||
                  "https://gowithguide.com/_next/image?url=https%3A%2F%2Ftravelience-cdn.s3.us-east-1.amazonaws.com%2Fgowithguide%2Fassets%2Fhero-bg-home.png&w=1080&q=80"
                }
                style={{
                  margin:"20px",
                  width: "90%",
                  height: "15rem",
                  borderRadius:"10%"
                }}
                alt={tourguide.fullName}
              />
              {/* Content */}
              <div className="p-4">
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#1981c6",
                  }}
                  className="text-lg font-bold text-gray-800"
                >
                  {tourguide.fullName}
                </h3>

                {/* Rating */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                  className="flex items-center text-sm text-gray-700 mt-1"
                >
                  <span className="text-yellow-500 flex items-center mr-2">
                    ⭐
                  </span>
                  <span className="font-semibold mr-2">4.78 / 5</span>
                </div>

                {/* Location */}
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#e5e7eb",
                    color: "#374151",
                    fontSize: "1rem",
                    borderRadius: "0.375rem",
                  }}
                >
                <i className="fas fa-location-dot location-icon"></i>
                  {tourguide.address || "Japan"}
                </span>
                {/* Additional Info */}
                <div className="info-section">
                  <p className="info-item">
                    <i className="fas fa-venus-mars"></i> {tourguide.gender} <i style={{marginLeft: "50px"}} className="fas fa-phone"></i> {tourguide.contactNumber}
                  </p>
                  <p className="info-item">
                    
                  </p>
                  <p className="info-item">
                    <i className="fas fa-envelope"></i> {tourguide.eMail}
                  </p>
                  <p className="info-item big-text">
                    <i className="fas fa-briefcase"></i>
                    <strong> {tourguide.workExperience}     <i style={{marginLeft: "50px"}} className="fas fa-money-bill-wave"></i> Rs. {tourguide.amount}</strong>
                  </p>
                </div>

                <p style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  color: "#555",
                  marginTop: "10px",
                  fontSize: "0.95rem",
                  lineHeight: "1.4"
                }}>{tourguide.description}</p>
                <p>
                  <strong>Booked:</strong>
                </p>
                <p>
                  From: <strong>{this.state.dateFrom && this.state.dateFrom.toLocaleDateString()}</strong> To: 
                  <strong>{this.state.dateTo && this.state.dateTo.toLocaleDateString()}</strong>
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => this.openModal(tourguide)}
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    backgroundColor: "red",
                    border: "none",
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium"
                >
                  Reserve
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && selectedGuide && (
        <div style={styles.modalOverlay}>
          <div
            style={{
              ...styles.modalContent,
              animation: "fadeInScale 0.4s ease-out",
            }}
          >
            <button style={styles.modalCloseBtn} onClick={this.closeModal}>
              &times;
            </button>
            <h2 style={styles.modalTitle}>
              Reserve Tour Guide
            </h2>
            <p style={styles.modalDescription}>
              You're about to reserve{" "}
              <strong>{selectedGuide.fullName}</strong>
            </p>

            <div style={styles.datePickerContainer}>
              <div style={styles.datePickerGroup}>
                <i className="fas fa-calendar-alt" style={styles.icon}></i>
                <label style={styles.label}>From:</label>
                <DatePicker
                  selected={dateFrom}
                  onChange={(date) => this.setState({ dateFrom: date })}
                  selectsStart
                  startDate={dateFrom}
                  endDate={dateTo}
                  placeholderText="Select start date"
                  style={styles.datePicker}
                />
              </div>

              <div style={styles.datePickerGroup}>
                <i className="fas fa-calendar-check" style={styles.icon}></i>
                <label style={styles.label}>To:</label>
                <DatePicker
                  selected={dateTo}
                  onChange={(date) => this.setState({ dateTo: date })}
                  selectsEnd
                  startDate={dateFrom}
                  endDate={dateTo}
                  minDate={dateFrom}
                  placeholderText="Select end date"
                  style={styles.datePicker}
                />
              </div>
            </div>

            <button
              onClick={() =>
                this.handleReserve(selectedGuide.fullName, selectedGuide._id)
              }
              style={styles.confirmButton}
              className="transition-all"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}

    </div>

      </>
    );
  }
}
