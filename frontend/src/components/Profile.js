import { Link, useLocation } from "react-router-dom";
import styles from "../style_sheets/UserProfile.module.css";
import sidebarImg from "../img/sidebar.png";
import Info from "../img/info.png";
import Guide from "../img/tour-guide.png";
import Package from "../img/tour-bus.png";
import Hotel from "../img/resort.png";

const ProfileSidebar = ({ userData, userId }) => {
  const location = useLocation();

  return (
    <aside
      className={`bg-white shadow-sm p-4 rounded-4 h-full ${styles.sidebar}`}
      style={{
        minWidth: "250px",
        height: "100%",
        borderRight: "1px solid #e9ecef",
        fontFamily: "poppins",
      }}
    >
      <hr />
      <div className="d-flex flex-column gap-2">
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
          alt={"package"}
          isActive={location.pathname === `/profile/reservedpackages/${userId}`}
        />
        <CustomSidebarLink
          to={`/profile/reservedhotels/${userId}`}
          label="Reserved Hotels"
          img={Hotel}
          alt={"hotel"}
          isActive={location.pathname === `/profile/reservedhotels/${userId}`}
        />
        <img
          src={sidebarImg}
          alt="sidebar img"
          style={{
            objectFit: "contain",
            width: "15rem",
          }}
        />
      </div>
    </aside>
  );
};

const CustomSidebarLink = ({ to, label, img, alt, isActive }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-3 text-decoration-none"
    style={{
      color: isActive ? "#343a40" : "#6c757d",
      backgroundColor: isActive ? "#f8f9fa" : "transparent",
      fontWeight: isActive ? "500" : "normal",
      transition: "0.3s",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
      e.currentTarget.style.color = "#343a40";
    }}
    onMouseOut={(e) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#6c757d";
      }
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
