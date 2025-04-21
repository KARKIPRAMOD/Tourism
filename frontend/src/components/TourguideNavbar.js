// components/TourGuideNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "../style_sheets/Navbar.module.css"; // Assuming you have this

const TourGuideNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/tour-guide-dashboard" className={styles.navLink}>
        Dashboard
      </Link>
      <Link to="/all/tourguide" className={styles.navLink}>
        {" "}
        {/* Or a specific view */}
        My Profile {/* Adjust link as needed */}
      </Link>
      <Link to="/tour-updates" className={styles.navLink}>
        Tour Updates
      </Link>
      <Link to="/tour-guide-faq" className={styles.navLink}>
        FAQ
      </Link>
      {/* Add other tour guide specific links here */}
    </nav>
  );
};

export default TourGuideNavbar;
