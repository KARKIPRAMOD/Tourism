import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TourUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location = "/home";
  };

  // Fetch the tour updates from the backend
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('http://localhost:8070/tourupdates');
        setUpdates(response.data);
      } catch (error) {
        setMessage('Error fetching updates');
        console.error('Error fetching updates:', error);
      }
    };

    fetchUpdates();
  }, []); // Run this on mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const tourUpdateData = { title, description };

    try {
      // Sending data to the backend
      const response = await axios.post('http://localhost:8070/tourupdates/tour-updates', tourUpdateData, {
        headers: {
          'Content-Type': 'application/json', // Set content type to application/json
        },
      });

      // Successfully added the tour update
      setMessage('Tour update added successfully!');
      setTitle('');
      setDescription('');
      // Fetch the updates again to reflect the newly added update
      const updatedResponse = await axios.get('http://localhost:8070/tourupdates');
      setUpdates(updatedResponse.data);
    } catch (error) {
      console.error('Error adding tour update:', error);
      setMessage('Error adding tour update.');
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/tourupdates/tour-updates/${id}`);
      setUpdates(updates.filter(update => update._id !== id)); // Remove the deleted update from state
    } catch (error) {
      console.error('Error deleting tour update:', error);
      setMessage('Error deleting tour update.');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '240px',
          backgroundColor: '#2c2c54',
          zIndex: 1000,
          borderRight: '2px solid #ddd',
          paddingTop: '20px',
          paddingRight: '10px',
        }}
      >
        <h3 className="text-center text-white mb-4">Admin Panel</h3>
        <ul className="list-unstyled">
          <li>
            <Link to="/admin/dashboard" className="d-flex align-items-center text-white px-3 py-2">
              <i className="bi bi-house-door me-2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/adminTourguide" className="d-flex align-items-center text-white px-3 py-2">
              <i className="bi bi-person-lines-fill me-2"></i> Tour Guides
            </Link>
          </li>
          <li>
            <Link to="/adminHotel" className="d-flex align-items-center text-white px-3 py-2">
              <i className="bi bi-building me-2"></i> Hotels
            </Link>
          </li>
          <li>
            <Link to="/adminPackage" className="d-flex align-items-center text-white px-3 py-2">
              <i className="bi bi-card-list me-2"></i> Packages
            </Link>
          </li>
          <li>
            <Link to="/all/user" className="d-flex align-items-center text-white px-3 py-2">
              <i className="bi bi-person-fill me-2"></i> Users
            </Link>
          </li>
        </ul>
        {/* Logout Button */}
        <div className="mt-auto">
          <div
              onClick={handleLogout}
              className="d-flex align-items-center text-white px-3 py-2"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </div>
        </div>
      </div>

      {/* Main Content (Tour Updates) */}
      <div style={{ marginLeft: '260px', padding: '20px', width: 'calc(100% - 260px)' }}>
        {/* Add Tour Update Form */}
        <div className="mt-5">
          <h4 className="mb-4">Add New Tour Update</h4>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Add Tour Update</button>
          </form>
        </div>

        {/* Display All Tour Updates */}
        <div className="mt-5">
          <h4>All Tour Updates</h4>
          {updates.length > 0 ? (
            updates.map((update) => (
              <div
                key={update._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)')}
                onMouseLeave={(e) => (e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)')}
              >
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #ddd',
                    padding: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h5
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }}
                  >
                    {update.title}
                  </h5>
                  <button
                    onClick={() => handleDelete(update._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
                <div style={{ padding: '15px' }}>
                  <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{update.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No tour updates available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourUpdates;
