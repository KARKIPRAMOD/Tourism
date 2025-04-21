// src/components/ProfileSidebar.js
import { Link } from "react-router-dom";
import styles from "../style_sheets/UserProfile.module.css";

const ProfileSidebar = ({ userData, userId }) => {
  return (
    <aside
      className={`bg-white p-4 shadow ${styles.sidebar}`}
      style={{ minWidth: "250px" }}
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
            className={`rounded-circle ${styles.pp}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <p className="mt-3 mb-1">Hello,</p>
          <h5>{userData.user_name}</h5>
        </div>
      )}
      <hr />
      <div className="list-group list-group-flush">
        <Link
          to={`/profile/home/${userId}`}
          className="list-group-item list-group-item-action"
        >
          My Details
        </Link>

        {/* <Link
          to={`/view/my-feedbacks/${userId}`}
          className="list-group-item list-group-item-action"
        >
          My Feedbacks
        </Link> */}

        <Link
          to={`/profile/reservedTourGuides/${userId}`}
          className="list-group-item list-group-item-action"
        >
          Reserved TourGuides
        </Link>
        {/* <Link className="list-group-item list-group-item-action">
          Reserved Packages
        </Link>
        <Link className="list-group-item list-group-item-action">
          Reserved Hotels
        </Link> */}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
