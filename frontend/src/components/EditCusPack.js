import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import pic2 from "../img/Tboy.jpg";
import pp from "../img/pp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/Profile.module.css";

function EditCusPack(props) {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [arriDate, setDate] = useState("");
  const [pickPlace, setPickPlace] = useState("");
  const [destination, setDesti] = useState("");
  const [NofDays, setDays] = useState("");
  const [NoPass, setPasseng] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getPackage();
    // Try to get the user ID from props first, then localStorage
    const propsUserId = props.userId;
    const storedUserId = localStorage.getItem("userId");
    const userIdToUse = propsUserId || storedUserId;

    console.log("EditCusPack - props userId:", propsUserId);
    console.log("EditCusPack - localStorage userId:", storedUserId);
    console.log("EditCusPack - using userId:", userIdToUse);

    if (userIdToUse) {
      setUserId(userIdToUse);
      retrieveUser(userIdToUse);
    }
  }, [props.userId]);

  function retrieveUser(id) {
    axios
      .get(`http://localhost:8070/user/${id}`)
      .then((res) => {
        if (res.data && res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log("Error retrieving user:", err));
  }

  function getPackage() {
    setInitialLoading(true);
    axios
      .get(`http://localhost:8070/cusPack/get/${id}`)
      .then((res) => {
        if (res.data) {
          setName(res.data.name || "");
          setMail(res.data.email || "");
          setPhone(res.data.phone || "");
          setDate(res.data.arriDate || "");
          setPickPlace(res.data.pickPlace || "");
          setDesti(res.data.destination || "");
          setDays(res.data.NofDays || "");
          setPasseng(res.data.NoPass || "");
          setNotes(res.data.notes || "");
          setInitialLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching package:", err);
        alert("Failed to load package details. Please try again.");
        setInitialLoading(false);
      });
  }

  function updateData(e) {
    e.preventDefault();
    setLoading(true);

    const updatedPackage = {
      name,
      email,
      phone,
      arriDate,
      pickPlace,
      destination,
      NofDays,
      NoPass,
      notes,
    };

    axios
      .patch(`http://localhost:8070/cusPack/update/${id}`, updatedPackage)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          alert("Package updated successfully!");
          // Redirect with user ID if available
          if (userId) {
            history.push(`/find/package/${userId}`);
          } else {
            history.push("/find/package");
          }
        } else {
          alert("Update failed. Please try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Update error:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Error updating package. Please try again.";
        alert(errorMessage);
      });
  }

  function renderSidebar() {
    return (
      <div className={styles.navbar_holder}>
        <nav
          id="sidebarMenu"
          className={`collapse d-lg-block collapse bg-white ${styles.sidebar}`}
        >
          <hr
            className={styles.divider}
            style={{ marginTop: "-40px", marginBottom: "25px" }}
          />
          <div className={styles.usercard}>
            <img src={pp} alt="Logo" className={styles.pp} />
            <div>
              <p className={styles.hello}>Hello,</p>
              <h2 className={styles.username}>{user.user_name}</h2>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to={`/profile/home/${userId}`}
                className={`${styles.sidelinks}`}
              >
                My Details
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to={`/view/payment+details/${userId}`}
                className={styles.sidelinks}
              >
                Payment Details
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to={`/view/payment+history/${userId}`}
                className={styles.sidelinks}
              >
                Payment History
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to="/print/payment+history" className={styles.sidelinks}>
                Monthly Report
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to={`/find/package/${userId}`}
                className={`${styles.sidelinks} active`}
              >
                My Tour Packages
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading package details...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.maincontainer}
      style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}
    >
      {userId && renderSidebar()}

      <div className={userId ? styles.content : "container"}>
        <div className="bg-white rounded shadow p-4">
          <div className="row mb-4">
            <div className="col-md-8">
              <h2 className="display-6 fw-bold text-primary">
                Edit Tour Package
              </h2>
              <p className="text-muted">
                Update your custom tour package details
              </p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src={pic2}
                className="img-fluid rounded"
                style={{ maxHeight: "150px" }}
                alt="Tour guide"
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          <hr className="my-4" />

          <form onSubmit={updateData}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="uname"
                    placeholder="Enter your name here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="uname">
                    Your Name <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Eg- jhone99@gmail.com"
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">
                    Email Address <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="Mobi"
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label htmlFor="Mobi">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="Date"
                    placeholder="Enter arrival date"
                    value={arriDate}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  <label htmlFor="Date">
                    Arrival Date <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="pickPlace"
                    placeholder="Enter pick up place here"
                    value={pickPlace}
                    onChange={(e) => setPickPlace(e.target.value)}
                    required
                  />
                  <label htmlFor="pickPlace">
                    Pickup Location <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="place"
                    placeholder="Enter destination here"
                    value={destination}
                    onChange={(e) => setDesti(e.target.value)}
                    required
                  />
                  <label htmlFor="place">
                    Destination <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="days"
                    min="1"
                    max="7"
                    placeholder="Number of days"
                    value={NofDays}
                    onChange={(e) => setDays(e.target.value)}
                    required
                  />
                  <label htmlFor="days">
                    Number of Days (1-7) <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="passengers"
                    min="1"
                    max="15"
                    placeholder="Number of passengers"
                    value={NoPass}
                    onChange={(e) => setPasseng(e.target.value)}
                    required
                  />
                  <label htmlFor="passengers">
                    Number of Passengers (1-15){" "}
                    <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="note"
                    placeholder="Enter any notes here"
                    style={{ height: "120px" }}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                  ></textarea>
                  <label htmlFor="note">
                    Additional Notes <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <div className="col-12 mt-3 text-center">
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-save me-2"></i> Update Package
                      </>
                    )}
                  </button>
                  <Link
                    to={userId ? `/find/package/${userId}` : "/find/package"}
                    className="btn btn-outline-secondary btn-lg"
                  >
                    <i className="fa fa-arrow-left me-2"></i> Cancel
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCusPack;
