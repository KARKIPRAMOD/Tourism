// components/NavbarAdmin.js
import { Link } from "react-router-dom";

const NavbarAdmin = () => (
  <ul>
    <li>
      <Link to="/admin/dashboard">Dashboard</Link>
    </li>
    <li>
      <Link to="/add/tourguide">Manage Tour Guide</Link>
    </li>
    <li>
      <Link to="/view/hotel">Hotels</Link>
    </li>
    <li>
      <Link to="/logout">Logout</Link>
    </li>
  </ul>
);

export default NavbarAdmin;
