/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styleHome from "../style_sheets/Home.module.css";

const styles = {
  prettyGuideReportContainer: {
    backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "3rem 5rem",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  prettyGuideCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "30px",
  },
  card: {
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)",
  },
  imageWrapper: {
    flexShrink: 0,
    width: "100%",
    height: "220px",
    overflow: "hidden",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  img: {
    width: "100%",
    height: "100%",
objectFit: "contain",
    transition: "transform 0.4s ease",
  },
  imgHover: {
    transform: "scale(1.05)",
  },
  cardContent: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  guideName: {
    fontWeight: "700",
    fontSize: "1.3rem",
    color: "#1e40af",
    marginBottom: "8px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  ratingText: {
    fontWeight: "600",
    fontSize: "1rem",
  },
  locationBadge: {
    display: "inline-block",
    marginBottom: "12px",
    padding: "4px 10px",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    fontSize: "0.95rem",
    borderRadius: "0.375rem",
  },
  infoSection: {
    flexGrow: 1,
    fontSize: "0.95rem",
    color: "#4b5563",
    marginBottom: "12px",
  },
  description: {
    border: "1px solid #ddd",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#fefefe",
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  bookedDates: {
    marginBottom: "12px",
    fontWeight: "600",
  },
  reserveButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  reserveButtonHover: {
    backgroundColor: "#b91c1c",
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
    animation: "fadeIn 0.4s ease",
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 6px 30px rgba(0, 0, 0, 0.25)",
    animation: "scaleIn 0.3s ease",
  },
  modalCloseBtn: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "transparent",
    border: "none",
    fontSize: "2rem",
    color: "#999",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  modalCloseBtnHover: {
    color: "#ff4d4d",
  },
  modalTitle: {
    fontSize: "2rem",
    color: "#2563eb",
    marginBottom: "20px",
    fontWeight: "700",
  },
  modalDescription: {
    marginBottom: "30px",
    fontSize: "1.2rem",
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
    color: "#2563eb",
  },
  label: {
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#333",
  },
  confirmButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#2563eb",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "1.2rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "35px",
  },
  confirmButtonHover: {
    backgroundColor: "#1e40af",
  },
};

// Simple keyframe animation for modal fade & scale
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }`,
  styleSheet.cssRules.length
);
styleSheet.insertRule(
  `@keyframes scaleIn {
    from {transform: scale(0.95);}
    to {transform: scale(1);}
  }`,
  styleSheet.cssRules.length
);

export default class GuideReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourguides: [],
      hoveredIndex: null,
      showModal: false,
      selectedGuide: null,
      reservationDates: {}, // stores { tourguideId: { dateFrom, dateTo } }
      reservations: [],
      modalDateFrom: null,
      modalDateTo: null,
      reserveBtnHover: false,
      modalCloseHover: false,
    };
  }

  componentDidMount() {
    this.retriveTourguides();
    this.fetchReservations();
  }

  retriveTourguides() {
    axios
      .get("http://localhost:8070/tourguide/")
      .then((res) => {
        if (res.data.success) {
          this.setState({ tourguides: res.data.guides });
        }
      })
      .catch((err) => {
        console.error("Error fetching tour guides:", err);
      });
  }

  fetchReservations() {
    axios
      .get("http://localhost:8070/tourguideReservation/")
      .then((res) => {
        const reservations = res.data || [];
        this.setState({ reservations }, this.compareTourguideReservations);
      })
      .catch((error) => console.error("Error fetching reservations:", error));
  }

  compareTourguideReservations = () => {
    const { tourguides, reservations } = this.state;
    const reservationDates = {};

    reservations.forEach((reservation) => {
      if (!reservation || !reservation.tourguide) return;

      const reservedTourguide = tourguides.find(
        (tourguide) =>
          tourguide._id.toString() ===
          (reservation.tourguide._id
            ? reservation.tourguide._id.toString()
            : reservation.tourguide.toString())
      );

      if (reservedTourguide) {
        reservationDates[reservedTourguide._id] = {
          dateFrom: new Date(reservation.startDate),
          dateTo: new Date(reservation.endDate),
        };
      }
    });

    this.setState({ reservationDates });
  };

  handleMouseEnter = (index) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  openModal = (guide) => {
    const { reservationDates } = this.state;
    this.setState({
      showModal: true,
      selectedGuide: guide,
      modalDateFrom: reservationDates[guide._id]?.dateFrom || null,
      modalDateTo: reservationDates[guide._id]?.dateTo || null,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedGuide: null,
      modalDateFrom: null,
      modalDateTo: null,
    });
  };

  handleReserve = (guideName, guideId) => {
    const { modalDateFrom, modalDateTo } = this.state;
    const userId = localStorage.getItem("userId");

    if (modalDateFrom && modalDateTo && modalDateFrom <= modalDateTo) {
      const payload = {
        userId,
        tourguideId: guideId,
        startDate: modalDateFrom,
        endDate: modalDateTo,
      };

      axios
        .post(`http://localhost:8070/tourguideReservation/reserve`, payload)
        .then((response) => {
          if (response.data.message === "Reservation successful") {
            alert(
              `Reserved guide: ${guideName}\nFrom: ${modalDateFrom.toLocaleDateString()} To: ${modalDateTo.toLocaleDateString()}`
            );
            this.closeModal();
            this.fetchReservations(); // refresh reservations
          } else {
            alert(response.data.message);
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
      reservationDates,
      modalDateFrom,
      modalDateTo,
      reserveBtnHover,
      modalCloseHover,
    } = this.state;

    return (
      <>
        <div className={styleHome.container}>
          <img
            src={"https://www.travels2nepal.com/images/banner2.jpg"}
            className={styleHome.img}
            alt="banner"
          />
          <div className={styleHome.layer}>
            <div className={styleHome.centered}>
              <div className={styleHome.headerTxt}>Our Amazing Tour Guides</div>
              <div className={styleHome.sloganTxt}>
                "Stop worrying about the potholes in the road and enjoy the
                journey."
              </div>
            </div>
          </div>
        </div>

        <div style={styles.prettyGuideReportContainer}>
          <div style={styles.prettyGuideCardGrid}>
            {tourguides.map((tourguide, index) => (
              <div
                key={index}
                style={{
                  ...styles.card,
                  ...(hoveredIndex === index ? styles.cardHover : {}),
                }}
                onMouseEnter={() => this.handleMouseEnter(index)}
                onMouseLeave={this.handleMouseLeave}
              >
                <div style={styles.imageWrapper}>
                  <img
                  
                    src={
                      tourguide.image
                        ? `http://localhost:8070/uploads/tourguide_pictures/${tourguide.image}`
                        : "https://gowithguide.com/_next/image?url=https%3A%2F%2Ftravelience-cdn.s3.us-east-1.amazonaws.com%2Fgowithguide%2Fassets%2Fhero-bg-home.png&w=1080&q=80"
                    }
                    alt={tourguide.fullName}
                    style={{
                      ...styles.img,
                      ...(hoveredIndex === index ? styles.imgHover : {})
                      }}
                  />
                </div>

                <div style={styles.cardContent}>
                  <h3 style={styles.guideName}>{tourguide.fullName}</h3>

                  <div style={styles.ratingRow}>
                    <span style={{ color: "#fbbf24", fontSize: "1.25rem" }}>⭐</span>
                    <span style={styles.ratingText}>4.78 / 5</span>
                  </div>

                  <span style={styles.locationBadge}>
                    <i className="fas fa-location-dot location-icon"></i>{" "}
                    {tourguide.address || "Japan"}
                  </span>

                  <div style={styles.infoSection}>
                    <p className="info-item">
                      <i className="fas fa-venus-mars"></i> {tourguide.gender}{" "}
                      <i style={{ marginLeft: "50px" }} className="fas fa-phone"></i>{" "}
                      {tourguide.contactNumber}
                    </p>
                    <p className="info-item">
                      <i className="fas fa-envelope"></i> {tourguide.eMail}
                    </p>
                    <p className="info-item big-text">
                      <i className="fas fa-briefcase"></i>
                      <strong>
                        {" "}
                        {tourguide.workExperience}{" "}
                        <i
                          style={{ marginLeft: "50px" }}
                          className="fas fa-money-bill-wave"
                        ></i>{" "}
                        Rs. {tourguide.amount}
                      </strong>
                    </p>
                  </div>

                  <p style={styles.description}>{tourguide.description}</p>

                  <p style={styles.bookedDates}>
                    <strong>Booked:</strong>
                  </p>
                  <p>
                    From:{" "}
                    <strong>
                      {reservationDates[tourguide._id]?.dateFrom
                        ? reservationDates[tourguide._id].dateFrom.toLocaleDateString()
                        : "N/A"}
                    </strong>{" "}
                    To:{" "}
                    <strong>
                      {reservationDates[tourguide._id]?.dateTo
                        ? reservationDates[tourguide._id].dateTo.toLocaleDateString()
                        : "N/A"}
                    </strong>
                  </p>

                  <button
                    onClick={() => this.openModal(tourguide)}
                    style={{
                      ...styles.reserveButton,
                      ...(reserveBtnHover ? styles.reserveButtonHover : {}),
                    }}
                    onMouseEnter={() => this.setState({ reserveBtnHover: true })}
                    onMouseLeave={() => this.setState({ reserveBtnHover: false })}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && selectedGuide && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <button
                style={{
                  ...styles.modalCloseBtn,
                  ...(modalCloseHover ? styles.modalCloseBtnHover : {}),
                }}
                onClick={this.closeModal}
                onMouseEnter={() => this.setState({ modalCloseHover: true })}
                onMouseLeave={() => this.setState({ modalCloseHover: false })}
              >
                &times;
              </button>
              <h2 style={styles.modalTitle}>Reserve Tour Guide</h2>
              <p style={styles.modalDescription}>
                You're about to reserve <strong>{selectedGuide.fullName}</strong>
              </p>

              <div style={styles.datePickerContainer}>
                <div style={styles.datePickerGroup}>
                  <i className="fas fa-calendar-alt" style={styles.icon}></i>
                  <label style={styles.label}>From:</label>
                  <DatePicker
                    selected={modalDateFrom}
                    onChange={(date) => this.setState({ modalDateFrom: date })}
                    selectsStart
                    startDate={modalDateFrom}
                    endDate={modalDateTo}
                    placeholderText="Select start date"
                    style={styles.datePicker}
                  />
                </div>

                <div style={styles.datePickerGroup}>
                  <i className="fas fa-calendar-check" style={styles.icon}></i>
                  <label style={styles.label}>To:</label>
                  <DatePicker
                    selected={modalDateTo}
                    onChange={(date) => this.setState({ modalDateTo: date })}
                    selectsEnd
                    startDate={modalDateFrom}
                    endDate={modalDateTo}
                    minDate={modalDateFrom}
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
      </>
    );
  }
}
