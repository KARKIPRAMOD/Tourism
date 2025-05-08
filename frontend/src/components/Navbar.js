import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import css file from style sheets directory
import styles from "../style_sheets/Navbar.module.css";

const Navbar = () => {
  // Get user role from localStorage
  const userRole = localStorage.getItem("userRole");

  // Debugging log to ensure userRole is being fetched correctly
  console.log("Current User Role:", userRole);

  // If the user is an admin, don't render the Navbar
  if (userRole === "admin") {
    console.log("Admin detected, hiding navbar...");
    return null; // Hides the navbar if userRole is 'admin'
  }

  // Render navbar for non-admin users
  return (
    <div className={styles.body}>
      <header className={styles.header1}>
        <div id="title" className={styles.title1}>
          <h1 className={styles.ha}>Tour & Travel</h1>
        </div>
      </header>

      <nav className={styles.navbar}>
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/hotels"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Hotels
        </NavLink>
        <NavLink
          to="/tour-guides"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Tour Guides
        </NavLink>
        <NavLink
          to="/tour-packages"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Tour Packages
        </NavLink>
        <NavLink
          to="/travel-updates"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Travel Updates
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
