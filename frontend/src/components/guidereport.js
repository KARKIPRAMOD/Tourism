import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const styles = {
  prettyGuideReportContainer: {
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "12px",
  },
  prettyGuideReportTitle: {
    textAlign: "center",
    color: "#333",
    marginBottom: "40px",
    fontSize: "2.5rem",
    fontWeight: "600",
  },
  prettyGuideCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
    backgroundColor: "#007bff",
    color: "white",
    padding: "25px",
    textAlign: "center",
  },
  prettyCardHeaderH3: {
    marginBottom: "0",
    fontSize: "1.6rem",
    fontWeight: "500",
  },
  prettyCardBody: {
    padding: "25px",
  },
  detailHighlight: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  detailHighlightStrong: {
    fontSize: "1.1rem",
    color: "#28a745",
  },
  largerText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#343a40",
  },
  prettyCardBodyP: {
    marginBottom: "12px",
    color: "#555",
    fontSize: "1rem",
  },
  prettyCardBodyI: {
    color: "#007bff",
    marginRight: "8px",
  },
  prettyPrintButton: {
    padding: "15px 30px",
    borderRadius: "30px",
    fontWeight: 600,
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    backgroundColor: "#28a745",
    color: "white",
    marginTop: "10px",
    width: "100%",
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
  datePickerContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "20px",
  },
  confirmButton: {
    padding: "12px 25px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
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
  }

  retriveTourguides() {
    axios.get("http://localhost:8070/tourguide/").then((res) => {
      if (res.data.success) {
        this.setState({
          tourguides: res.data.existingTourguides,
        });
      }
    });
  }

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
    } = this.state;

    return (
      <div style={styles.prettyGuideReportContainer}>
        <h2 style={styles.prettyGuideReportTitle}>
          <i className="fas fa-address-card mr-2"></i>
          <strong>Our Amazing Tour Guides</strong>
        </h2>
        <div style={styles.prettyGuideCardGrid}>
          {tourguides.map((tourguide, index) => (
            <div
              key={index}
              style={{
                ...styles.prettyGuideCard,
                ...(hoveredIndex === index && styles.prettyGuideCardHover),
              }}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={this.handleMouseLeave}
            >
              <div style={styles.prettyCardHeader}>
                <h3 style={styles.prettyCardHeaderH3}>
                  <i className="fas fa-user-tie mr-2"></i>
                  {tourguide.fullName}
                </h3>
              </div>
              <div style={styles.prettyCardBody}>
                <p style={styles.prettyCardBodyP}>
                  <i className="fas fa-birthday-cake mr-2"></i>
                  <strong>Age:</strong> {tourguide.age} (Born on{" "}
                  {new Date(tourguide.dateOfBirth).toLocaleDateString()})
                </p>
                <p style={styles.prettyCardBodyP}>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <strong>Address:</strong> {tourguide.address}
                </p>
                <p style={styles.prettyCardBodyP}>
                  <i className="fas fa-phone mr-2"></i>
                  <strong>Contact:</strong> {tourguide.contactNumber}
                </p>
                <p style={styles.prettyCardBodyP}>
                  <i className="fas fa-envelope mr-2"></i>
                  <strong>Email:</strong> {tourguide.eMail}
                </p>
                <p style={styles.prettyCardBodyP}>
                  <i className="fas fa-venus-mars mr-2"></i>
                  <strong>Gender:</strong> {tourguide.gender}
                </p>
                <div style={styles.detailHighlight}>
                  <strong style={styles.detailHighlightStrong}>
                    <i className="fas fa-briefcase mr-2"></i>
                    Experience:
                  </strong>{" "}
                  <span style={styles.largerText}>
                    {tourguide.workExperience} Years
                  </span>
                </div>
                <div style={styles.detailHighlight}>
                  <strong style={styles.detailHighlightStrong}>Rate:</strong>{" "}
                  <span style={styles.largerText}>
                    NPR {tourguide.amount} / Day
                  </span>
                </div>
                <button
                  style={styles.prettyPrintButton}
                  onClick={() => this.openModal(tourguide)}
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
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
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "#007bff",
                  marginBottom: "10px",
                }}
              >
                Reserve Tour Guide
              </h2>
              <p
                style={{
                  marginBottom: "25px",
                  fontSize: "1.1rem",
                  color: "#444",
                }}
              >
                You're about to reserve{" "}
                <strong>{selectedGuide.fullName}</strong>
              </p>

              <div
                style={{
                  ...styles.datePickerContainer,
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: "#007bff", fontSize: "1.2rem" }}
                  ></i>
                  <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    From:
                  </label>
                  <DatePicker
                    selected={dateFrom}
                    onChange={(date) => this.setState({ dateFrom: date })}
                    selectsStart
                    startDate={dateFrom}
                    endDate={dateTo}
                    placeholderText="Select start date"
                  />
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <i
                    className="fas fa-calendar-check"
                    style={{ color: "#007bff", fontSize: "1.2rem" }}
                  ></i>
                  <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    To:
                  </label>
                  <DatePicker
                    selected={dateTo}
                    onChange={(date) => this.setState({ dateTo: date })}
                    selectsEnd
                    startDate={dateFrom}
                    endDate={dateTo}
                    minDate={dateFrom}
                    placeholderText="Select end date"
                  />
                </div>
              </div>

              <button
                style={{ ...styles.confirmButton, marginTop: "20px" }}
                onClick={() =>
                  this.handleReserve(selectedGuide.fullName, selectedGuide._id)
                }
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
