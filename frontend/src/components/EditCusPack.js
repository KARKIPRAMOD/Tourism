import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import pic2 from "../img/Tboy.jpg";
import pp from "../img/pp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/Profile.module.css";

function EditCusPack(props) {
  // Adjust state variables to match your model fields
  const [packName, setPackName] = useState("");
  const [packID, setPackID] = useState(""); // If you want to show/edit this
  const [Destination, setDestination] = useState("");
  const [NumOfDays, setNumOfDays] = useState("");
  const [NumOfPassen, setNumOfPassen] = useState("");
  const [Hotel, setHotel] = useState("");
  const [Transport, setTransport] = useState("");
  const [TourGuide, setTourGuide] = useState("");
  const [TotPrice, setTotPrice] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getPackage();

    const propsUserId = props.userId;
    const storedUserId = localStorage.getItem("userId");
    const userIdToUse = propsUserId || storedUserId;

    if (userIdToUse) {
      setUserId(userIdToUse);
      retrieveUser(userIdToUse);
    }
  }, [props.userId]);

  const retrieveUser = (id) => {
    axios
      .get(`http://localhost:8070/user/${id}`)
      .then((res) => {
        if (res.data && res.data.user) setUser(res.data.user);
      })
      .catch((err) => console.error("Error retrieving user:", err));
  };

  const getPackage = () => {
    setInitialLoading(true);
    axios
      .get(`http://localhost:8070/package/get/${id}`)
      .then((res) => {
        if (res.data) {
          const pkg = res.data;

          setPackName(pkg.packName || "");
          setPackID(pkg.packID || "");
          setDestination(pkg.Destination || "");
          setNumOfDays(pkg.NumOfDays || "");
          setNumOfPassen(pkg.NumOfPassen || "");
          setHotel(pkg.Hotel || "");
          setTransport(pkg.Transport || "");
          setTourGuide(pkg.TourGuide || "");
          setTotPrice(pkg.TotPrice || "");
          setDescription(pkg.description || "");

          setInitialLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching package:", err);
        alert("Failed to load package details. Please try again.");
        setInitialLoading(false);
      });
  };

  const updateData = (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation example (add more as needed)
    if (
      !packName ||
      !Destination ||
      !NumOfDays ||
      !NumOfPassen ||
      !Hotel ||
      !Transport ||
      !TourGuide ||
      !TotPrice ||
      !description
    ) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const updatedPackage = {
      packName,
      packID, // if editable, else remove
      Destination,
      NumOfDays: Number(NumOfDays),
      NumOfPassen: Number(NumOfPassen),
      Hotel,
      Transport,
      TourGuide,
      TotPrice,
      description,
    };

    axios
      .patch(`http://localhost:8070/package/update/${id}`, updatedPackage)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          alert("Package updated successfully!");
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
        alert(err.response?.data?.error || "Error updating package.");
      });
  };

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
      {userId && (
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
              <Link to={`/profile/home/${userId}`} className={`${styles.sidelinks}`}>
                My Details
              </Link>
              <Link to={`/view/payment+details/${userId}`} className={styles.sidelinks}>
                Payment Details
              </Link>
              <Link to={`/view/payment+history/${userId}`} className={styles.sidelinks}>
                Payment History
              </Link>
              <Link to="/print/payment+history" className={styles.sidelinks}>
                Monthly Report
              </Link>
              <Link to={`/find/package/${userId}`} className={`${styles.sidelinks} active`}>
                My Tour Packages
              </Link>
            </div>
          </div>
        </nav>
      )}

      <div className={userId ? styles.content : "container"}>
        <div className="bg-white rounded shadow p-4">
          <div className="row mb-4">
            <div className="col-md-8">
              <h2 className="display-6 fw-bold text-primary">Edit Tour Package</h2>
              <p className="text-muted">Update your custom tour package details</p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src={pic2}
                className="img-fluid rounded"
                style={{ maxHeight: "150px" }}
                alt="Tour guide"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          <hr className="my-4" />

          <form onSubmit={updateData}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="packName" className="form-label">
                  Package Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="packName"
                  className="form-control"
                  placeholder="Enter package name"
                  value={packName}
                  onChange={(e) => setPackName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="packID" className="form-label">
                  Package ID
                </label>
                <input
                  type="text"
                  id="packID"
                  className="form-control"
                  placeholder="Enter package ID"
                  value={packID}
                  onChange={(e) => setPackID(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="destination" className="form-label">
                  Destination <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="destination"
                  className="form-control"
                  placeholder="Enter destination"
                  value={Destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="numOfDays" className="form-label">
                  Number of Days <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="numOfDays"
                  className="form-control"
                  min={1}
                  placeholder="Enter number of days"
                  value={NumOfDays}
                  onChange={(e) => setNumOfDays(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="numOfPassen" className="form-label">
                  Number of Passengers <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="numOfPassen"
                  className="form-control"
                  min={1}
                  placeholder="Enter number of passengers"
                  value={NumOfPassen}
                  onChange={(e) => setNumOfPassen(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="hotel" className="form-label">
                  Hotel <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="hotel"
                  className="form-control"
                  placeholder="Enter hotel name"
                  value={Hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="transport" className="form-label">
                  Transport <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="transport"
                  className="form-control"
                  placeholder="Enter transport details"
                  value={Transport}
                  onChange={(e) => setTransport(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="tourGuide" className="form-label">
                  Tour Guide <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="tourGuide"
                  className="form-control"
                  placeholder="Enter tour guide name"
                  value={TourGuide}
                  onChange={(e) => setTourGuide(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="totPrice" className="form-label">
                  Total Price <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="totPrice"
                  className="form-control"
                  placeholder="Enter total price"
                  value={TotPrice}
                  onChange={(e) => setTotPrice(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Enter description"
                  style={{ height: "120px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 mt-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
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
                &nbsp;&nbsp;
                <Link
                  to={userId ? `/find/package/${userId}` : "/find/package"}
                  className="btn btn-outline-secondary btn-lg"
                >
                  <i className="fa fa-arrow-left me-2"></i> Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCusPack;
