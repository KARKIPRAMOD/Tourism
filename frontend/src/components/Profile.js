import { Link } from "react-router-dom";
import styles from "../style_sheets/UserProfile.module.css";
import sidebarImg from "../img/sidebar.png";
import Info from "../img/info.png";
import Feedback from "../img/feedback.png";
import Guide from "../img/tour-guide.png";
import Package from "../img/tour-bus.png";
import Hotel from "../img/resort.png";

const ProfileSidebar = ({ userData, userId }) => {
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
      {userData && (
        <div className="text-center mb-4">
          <img
            src={
              userData.profile_picture
                ? `http://localhost:8070/uploads/profile_pictures/${userData.profile_picture}`
                : "https://via.placeholder.com/100?text=User"
            }
            alt="User"
            className={`rounded-circle border ${styles.pp}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderColor: "#dee2e6",
            }}
          />
          <p className="mt-3 mb-1 text-muted small">Hello,</p>
          <h5 className="fw-semibold">{userData.user_name}</h5>
        </div>
      )}

      <hr />

      <div className="d-flex flex-column gap-2">
        <CustomSidebarLink
          to={`/profile/home/${userId}`}
          label="My Details"
          img={Info}
          alt="info"
        />
        <CustomSidebarLink
          // to={`/profile/reservedTourGuides/${userId}`}
          label="My feedbacks"
          img={Feedback}
          alt={"Feedback"}
        />
        <CustomSidebarLink
          to={`/profile/reservedTourGuides/${userId}`}
          label="Reserved Tour Guides"
          img={Guide}
          alt={"Guide"}
        />
        <CustomSidebarLink
          to={`/profile/reservedpackages/${userId}`}
          label="Reserved Packages"
          img={Package}
          alt={"package"}
        />
        <CustomSidebarLink
          // to={`/profile/reservedTourGuides/${userId}`}
          label="Reserved Hotels"
          img={Hotel}
          alt={"hotel"}
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

const CustomSidebarLink = ({ to, label, img, alt }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-3 text-decoration-none"
    style={{
      color: "#6c757d",
      transition: "0.3s",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
      e.currentTarget.style.color = "#343a40";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = "#6c757d";
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
