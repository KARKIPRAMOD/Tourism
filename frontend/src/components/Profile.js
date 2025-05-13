import { Link, useLocation } from "react-router-dom";
import styles from "../style_sheets/UserProfile.module.css";
import Info from "../img/info.png";
import Guide from "../img/tour-guide.png";
import Package from "../img/tour-bus.png";
import Hotel from "../img/resort.png";

const ProfileSidebar = ({ userData, userId }) => {
  const location = useLocation();

  return (
    <aside
      className={`bg-white shadow-sm p-4 rounded-4 ${styles.sidebar}`}
      style={{
        position: "fixed", // Sidebar fixed at the left of the screen
        top: "0", // Keep at the top
        left: "0", // Align to the left side
        width: "290px", // Set a fixed width for the sidebar
        height: "100vh", // Full height of the viewport
        borderRight: "1px solid #e9ecef",
        fontFamily: "Poppins, sans-serif", // Use Poppins font for better readability
        zIndex: "99999", // Ensure it stays on top
        overflowY: "auto", // Allow scrolling if content exceeds the height
        backgroundColor: "#343a40", // Dark background for the sidebar
      }}
    >
      <div className="d-flex flex-column gap-2">
        {/* Always highlight User Dashboard */}
        <div
          style={{
            color: "#fff",
            backgroundColor: "#007bff", // Blue background for User Dashboard
            padding: "10px 15px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          User Dashboard
        </div>

        {/* Custom Sidebar Links */}
        <CustomSidebarLink
          to={`/profile/home/${userId}`}
          label="My Details"
          img={Info}
          alt="info"
          isActive={location.pathname === `/profile/home/${userId}`}
        />
        <CustomSidebarLink
          to={`/profile/reservedTourGuides/${userId}`}
          label="Reserved Tour Guides"
          img={Guide}
          alt={"Guide"}
          isActive={location.pathname === `/profile/reservedTourGuides/${userId}`}
        />
        <CustomSidebarLink
          to={`/profile/reservedpackages/${userId}`}
          label="Reserved Packages"
          img={Package}
          alt={"Package"}
          isActive={location.pathname === `/profile/reservedpackages/${userId}`}
        />
        <CustomSidebarLink
          to={`/profile/reservedhotels/${userId}`}
          label="Reserved Hotels"
          img={Hotel}
          alt={"Hotel"}
          isActive={location.pathname === `/profile/reservedhotels/${userId}`}
        />
      </div>

      {/* Back Button */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          localStorage.setItem("hideNavbar", "false"); // Set the flag to make navbar visible
          window.location.href = "/home"; // Navigate to /home
        }}
        style={{
          fontSize: "16px",
          fontWeight: "500",
          padding: "10px 20px",
          borderRadius: "5px",
          color: "white",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s",
          margin: "40px",
          marginTop: "300px"
        }}
        
      >
        <i className="bi bi-arrow-left-circle me-2"></i> Back
      </button>
    </aside>
  );
};

const CustomSidebarLink = ({ to, label, img, alt, isActive }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-3 text-decoration-none"
    style={{
      color: isActive ? "#000" : "#000", // Active links are white text, inactive links are black
      fontWeight: isActive ? "500" : "normal", // Bold text for active links
      transition: "0.3s", // Smooth transition effect on hover
    }}
  
 
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <div>
        <img
          src={img}
          alt={alt}
          style={{
            height: "20px",
            width: "20px",
          }}
        />
      </div>
      <div>{label}</div>
    </div>
  </Link>
);

export default ProfileSidebar;
