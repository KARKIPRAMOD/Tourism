import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminTourGuideView() {
  const [tourguides, setTourguides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8070/tourguide/");
      setTourguides(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching tour guides:", err);
      setError("Failed to load tour guides. Please try again later.");
      setIsLoading(false);
    }
  };

  const deleteTourGuide = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour guide?")) {
      try {
        await axios.delete(`http://localhost:8070/tourguide/delete/${id}`);
        alert("Tour guide deleted successfully");
        fetchTourGuides();
      } catch (err) {
        alert("Error deleting tour guide");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={fetchTourGuides}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tour Guide Management</h2>
      
      <div className="mb-3">
        <a href="/add/tourguide" className="btn btn-success">
          Add New Tour Guide
        </a>
      </div>

      {tourguides.length === 0 ? (
        <div className="alert alert-info">No tour guides found</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourguides.map((guide) => (
              <tr key={guide._id}>
                <td>{guide.fullName}</td>
                <td>{guide.age}</td>
                <td>{guide.contactNumber}</td>
                <td>{guide.eMail}</td>
                <td>{guide.workExperience}</td>
                <td>{guide.amount}</td>
                <td>
                  <a 
                    href={`/update/tourguide/${guide._id}`} 
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => deleteTourGuide(guide._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminTourGuideView;
