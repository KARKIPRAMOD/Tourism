import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import css file from style sheets directory
import styles from "../style_sheets/Navbar.module.css";
import photo from "../img/travel.svg";

const Navbar = () => {
  return (
    <div className={styles.body}>
      <header className={styles.header1}>
        <div id="title" className={styles.title1}>
          <h1 className={styles.ha}>Tour & Travel </h1>
        </div>
      </header>

      <nav className={styles.navbar}>
        <NavLink
          to={
            localStorage.getItem("userRole") === "admin"
              ? "/admin/dashboard"
              : "/home"
          }
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

      <main className={styles.main2}>
        <aside>
          <h2>
            <span className={styles.span1}>Fuel Mind Travel</span>
          </h2>

          <p className={styles.p1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.
          </p>
          <form className={styles.form1}>
            <a className={styles.inputBtn} href={"/add/hotel"}>
              <i className={styles.inputBtn}></i>&nbsp;Manager Panel{" "}
            </a>
          </form>
        </aside>
        <article>
          <img src={photo} className={styles.travel} alt="Travel" />
        </article>
      </main>
    </div>
  );
};

export default Navbar;
