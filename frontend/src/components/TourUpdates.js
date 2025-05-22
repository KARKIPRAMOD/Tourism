import React, { useState, useEffect } from 'react';
import axios from 'axios';
import tourImage from '../img/tourupdates.jpg'; 
import Footer from "./Footer";


const TourUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState('');
  const [openId, setOpenId] = useState(null); // Track which update is open

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

  // Toggle the accordion
  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id); // Close the update if it's already open
  };

  return (
    <>
      {/* Image Section */}
      <div className="image-container">
        <img src={tourImage} alt="Tour Updates" className="full-image" />
      </div>

      <div className="container mt-5">
        {/* Error message */}
        {message && <div className="alert alert-info">{message}</div>}

        <h3 className="text-center mb-4 animate-title">Latest Tour Updates</h3>
        <div className="updates-section">
          {updates.length > 0 ? (
            updates.map((update, index) => (
              <div
                className="update-card mb-4 animate-card"
                key={update._id} // Using MongoDB's unique _id as the key
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className="card-header"
                  onClick={() => toggleAccordion(update._id)}
                >
                  <h5>{update.title}</h5>
                  {/* Arrow Indicator */}
                  <span
                    className={`arrow ${
                      openId === update._id ? 'rotate' : ''
                    }`}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </div>
                {openId === update._id && (
                  <div className="card-body">
                    <p>{update.description}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No updates available at the moment.</div>
          )}
        </div>
      </div>

      <style>{`
        .image-container {
          width: 100%;
          height: 400px; // Adjust this value for better visibility
          overflow: hidden;
          position: relative;
        }

        .full-image {
          width: 100%;
          height: 100%;
          object-fit: contain; // Ensures the whole image is visible without zooming
          background-color: #000; // Dark background for letterboxing
          position: relative;
          transition: transform 0.5s ease;
        }

        .full-image:hover {
          transform: none; // Disable zooming on hover
        }

        .animate-title {
          animation: slideDown 0.8s ease-out;
        }

        .update-card {
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .update-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .card-header {
          background-color: #f4f4f4;
          padding: 15px;
          font-size: 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h5 {
          margin: 0;
        }

        .card-body {
          padding: 15px;
          background-color: #fff;
          font-size: 1rem;
          line-height: 1.5;
        }

        .card-body p {
          margin: 0;
        }

        .arrow {
          transition: transform 0.3s ease;
          color: #007bff;
        }

        .rotate {
          transform: rotate(180deg);
        }

        .updates-section {
          margin-top: 30px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .full-image {
            height: 200px;
          }

          .card-header h5 {
            font-size: 1.25rem;
          }

          .card-body p {
            font-size: 0.9rem;
          }
        }
      `}</style>
      <Footer/>
    </>
  );
};

export default TourUpdates;
