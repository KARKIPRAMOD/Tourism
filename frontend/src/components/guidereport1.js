import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllTourGuides = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state to check if data is being fetched
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const res = await axios.get("http://localhost:8070/tourguide/all");
      console.log(res.data); // Log the response to check the data structure
      if (res.data.success) {
        setTourGuides(res.data.tourGuides); // Update state with the fetched tour guides
      } else {
        setError("Failed to fetch tour guides");
      }
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Failed to fetch tour guides: " + err.message);
    } finally {
      setLoading(false); // Set loading to false once the data has been fetched
    }
  };

  const handleAcceptReservation = (id) => {
    axios
      .put(`http://localhost:8070/tourguide/accept/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Tour Guide reservation accepted.");
          fetchTourGuides(); // Refresh the list of tour guides
        }
      })
      .catch((err) => {
        alert("Failed to accept reservation: " + err.message);
      });
  };

  const handleRejectReservation = (id) => {
    axios
      .put(`http://localhost:8070/tourguide/reject/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Tour Guide reservation rejected.");
          fetchTourGuides(); // Refresh the list of tour guides
        }
      })
      .catch((err) => {
        alert("Failed to reject reservation: " + err.message);
      });
  };

  // Conditional rendering based on loading state
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <h4 className="mt-3">Loading Tour Guides...</h4>
      </div>
    );
  }

  // Display error message if something went wrong
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Admin Sidebar */}
        <div
          className="col-md-3 col-lg-2"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "240px",
            backgroundColor: "#2c2c54", // Dark Purple background color
            zIndex: 1000,
            borderRight: "2px solid #ddd",
            paddingTop: "20px",
          }}
        >
          <h3 className="text-center text-white mb-4">Admin Panel</h3>
          <ul className="list-unstyled">
            <li>
              <Link
                to="/admin/dashboard"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-house-door me-2"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/adminTourguideUI"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-person-lines-fill me-2"></i> Tour Guides
              </Link>
            </li>
            <li>
              <Link
                to="/all/hotel"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-building me-2"></i> Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/manage/AllPacks"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-card-list me-2"></i> Packages
              </Link>
            </li>
            <li>
              <Link
                to="/all/user"
                className="d-flex align-items-center text-white px-3 py-2"
              >
                <i className="bi bi-person-fill me-2"></i> Users
              </Link>
            </li>
          </ul>
          {/* Logout Button */}
          <div className="mt-auto">
            <Link
              to="/home"
              className="d-flex align-items-center text-white px-3 py-2"
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="col-md-9 col-lg-10 ms-auto"
          style={{ marginLeft: "240px", paddingTop: "20px" }}
        >
          <h5 className="card-title">All Tour Guides</h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Reservation Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tourGuides.map((guide) => (
                  <tr key={guide._id}>
                    <td>{guide.name}</td>
                    <td>{guide.email}</td>
                    <td>{guide.phone}</td>
                    <td>{guide.status}</td>
                    <td>
                      {guide.status === "pending" ? (
                        <>
                          <button
                            className="btn btn-success btn-sm mr-2"
                            onClick={() => handleAcceptReservation(guide._id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRejectReservation(guide._id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="badge badge-info">{guide.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTourGuides;
