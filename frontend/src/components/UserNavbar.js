// components/UserNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "../style_sheets/Navbar.module.css"; // Assuming you have this

const UserNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles.navLink}>
        Home
      </Link>
      <Link to="/view/hotel" className={styles.navLink}>
        Hotels
      </Link>
      <Link to="/view/cuspackage" className={styles.navLink}>
        Tour Packages
      </Link>
      <Link
        to={`/profile/home/${localStorage.getItem("userId")}`}
        className={styles.navLink}
      >
        Profile
      </Link>
      <Link to="/tour-updates" className={styles.navLink}>
        Tour Updates
      </Link>
      {/* Add other user-specific links here */}
    </nav>
  );
};

export default UserNavbar;
