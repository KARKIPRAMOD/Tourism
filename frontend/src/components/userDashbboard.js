import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Use this to redirect
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  // Get the user data from the backend API
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if the user is not authenticated
      history.push("/login");
    } else {
      // Fetch user data
      axios
        .get("http://localhost:8070/user/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Store user data in state
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Error fetching data. Please try again.");
          setLoading(false);
        });
    }
  }, [history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render different views based on the user's role
  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return (
          <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user.full_name}!</p>
            <div>
              {/* Admin-specific content */}
              <button>Manage Users</button>
              <button>View Feedback</button>
            </div>
          </div>
        );
      case "tourmanager":
        return (
          <div>
            <h2>Tour Manager Dashboard</h2>
            <p>Welcome, {user.full_name}!</p>
            <div>
              {/* Tour Manager-specific content */}
              <button>Manage Tours</button>
              <button>View Tour Guides</button>
            </div>
          </div>
        );
      case "user":
        return (
          <div>
            <h2>User Dashboard</h2>
            <p>Welcome, {user.full_name}!</p>
            <div>
              {/* User-specific content */}
              <button>View My Feedback</button>
              <button>Edit Profile</button>
            </div>
          </div>
        );
      default:
        return <div>Unauthorized access</div>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default UserDashboard;
