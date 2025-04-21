import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import pic2 from "../img/Tboy.jpg";
import myStyle from "../style_sheets/Style.module.css";
import styles from "../style_sheets/Profile.module.css";
import pp from "../img/pp.png";

function CusPackage(props) {
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
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const history = useHistory();

  // Get user info on component mount
  useEffect(() => {
    // Try to get userId from props first, then localStorage
    const propsUserId = props.userId;
    const storedUserId = localStorage.getItem("userId");
    const userIdToUse = propsUserId || storedUserId;

    if (userIdToUse) {
      setUserId(userIdToUse);
      fetchUserInfo(userIdToUse);
    } else {
      setLoadingUser(false);
    }
  }, [props.userId]);

  // Fetch user details
  const fetchUserInfo = (id) => {
    setLoadingUser(true);
    axios
      .get(`http://localhost:8070/user/${id}`)
      .then((res) => {
        if (res.data && res.data.user) {
          const userData = res.data.user;
          setUser(userData);

          // Pre-populate form with user data
          setName(userData.user_name || "");
          setMail(userData.email || "");
          setPhone(userData.contact_no || "");
        }
        setLoadingUser(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoadingUser(false);
      });
  };

  function sendData(e) {
    e.preventDefault();
    setLoading(true);

    const newPackage = {
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
      .post("http://localhost:8070/cusPack/add", newPackage)
      .then(() => {
        setLoading(false);
        alert("Your Package Created Successfully!");

        // Navigate to user's packages
        if (userId) {
          history.push(`/find/package/${userId}`);
        } else {
          history.push("/find/package");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("Error creating package: " + err.message);
      });
  }

  // Render sidebar if user is logged in
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
              <Link to={`/find/package/${userId}`} className={styles.sidelinks}>
                My Tour Packages
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  if (loadingUser) {
    return (
      <div
        className="container-fluid py-5 text-center"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading user information...</p>
      </div>
    );
  }

  return (
    <div
      className={userId ? styles.maincontainer : ""}
      style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}
    >
      {userId && renderSidebar()}

      <div
        className={userId ? styles.content : "container-fluid py-5"}
        style={!userId ? { backgroundColor: "#f8f9fa" } : {}}
      >
        <div className="container bg-white rounded shadow p-4">
          <div className="row mb-4">
            <div className="col-md-8">
              <h2 className="display-6 fw-bold text-primary">
                Create Custom Tour Package
              </h2>
              <p className="text-muted">
                Enter your details to customize your perfect tour experience
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

          <form onSubmit={sendData}>
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
                    readOnly={userId ? true : false}
                  />
                  <label htmlFor="uname">
                    Your Name <span className="text-danger">*</span>
                  </label>
                  {userId && (
                    <small className="text-muted">
                      Using logged-in user's name
                    </small>
                  )}
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
                    readOnly={userId ? true : false}
                  />
                  <label htmlFor="email">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  {userId && (
                    <small className="text-muted">
                      Using your registered email
                    </small>
                  )}
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
                    readOnly={userId ? true : false}
                  />
                  <label htmlFor="Mobi">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  {userId && (
                    <small className="text-muted">
                      Using your registered phone number
                    </small>
                  )}
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-folder-plus me-2"></i> Create
                        Package
                      </>
                    )}
                  </button>
                  {userId ? (
                    <Link
                      to={`/find/package/${userId}`}
                      className="btn btn-outline-secondary btn-lg"
                    >
                      <i className="fa fa-arrow-left me-2"></i> Back to My
                      Packages
                    </Link>
                  ) : (
                    <Link
                      to="/view/cuspackage"
                      className="btn btn-outline-secondary btn-lg"
                    >
                      <i className="fa fa-arrow-left me-2"></i> Back to Packages
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CusPackage;
