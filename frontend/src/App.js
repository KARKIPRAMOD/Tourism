import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import css file from style sheets directory
import styles from "./style_sheets/App.module.css";

// Import images from img directory
import logo from "./img/logoFinal.png";

// Import components from the component directory
import MyFeedbacks from "./components/myFeedbacks";
import ReservedTourGuides from "./components/ReservedTourGuides";

import Home from "./components/Home";
import AddPayment from "./components/AddPayment";
import DisplayPayment from "./components/DisplayPayment";
import UpdatePayment from "./components/UpdatePayment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import PaymentHistory from "./components/PaymentHistory";
import PrintPayments from "./components/PrintPayment";
import Checkout from "./components/Checkout";
import AddTourguide from "./components/AddTourguide";
import AllTourguides from "./components/AllTourguides";
import UpdateTourguide from "./components/UpdateTourguide";
import AddHotel from "./components/AddHotel";
import BookingHotel from "./components/BookingHotel";
import Navbar from "./components/Navbar";
import AllHotel from "./components/AllHotel";
import EditHotel from "./components/EditHotel";
import ViewHotel from "./components/ViewHotel";
import Report from "./components/report";
import AddPackage from "./components/addPackage";
import Manager from "./components/PackManager";
import Sith from "./components/edit";
import CusPack from "./components/CustomerPack";
import CusPackage from "./components/customizePackage";
import FindMyPack from "./components/findMyPack";
import AllPacks from "./components/AllPacks";
import EditPack from "./components/PackUpdate";
import GuideReport from "./components/guidereport";
import EditCusPack from "./components/EditCusPack";
import TourGuideFAQ from "./components/TourGuideFAQ";
import TourUpdates from "./components/TourUpdates";
import AdminTourGuideView from "./components/AdminTourGuideView";
import AdminDashboard from "./components/AdminDashboard";
import AllUser from "./components/allUser";
import Trekking from "./components/Trekking";
import Zipflying from "./components/Zipflying";
import Skydiving from "./components/Skydiving";
import Bungee from "./components/Bungee";
import MotorBiking from "./components/MotorBiking";
import Rafting from "./components/Rafting";
import Canyoying from "./components/Canyoying";
import MountainBiking from "./components/MountainBiking";
import Paragliding from "./components/Paragliding";
import HotelReservation from "./components/HotelReservation";
import ReservedPackages from "./components/ReservedPackages";
import ReservedHotel from "./components/ReservedHotel";
import TourGuideConfirmation from "./components/TourGuideConfirmation";
import HotelReservationConfirmation from "./components/HotelConfirmation";
import PackageConfirmation from "./components/PackageConfirmation.js";  // Correct import statement
import PackageDetails from "./components/PackageDetails";
import TourUpdateForm from "./components/AdminTourUpdates.js"
import TourGuideDashboard from "./components/TourGuideDashboard.js"
import TourguideAdditionalInfo from"./components/additioaldetaails.js"
import TourGuideProfile from "./components/TourguideProfile.js";
import ThingsToDo from "./components/thingsto.js"

const App = () => {
  const [userId, setUserId] = React.useState(() => {
    return localStorage.getItem("userId") || null;
  });

  const isProfilePage = window.location.pathname.includes("/profile");
  const isAuthorizedForTourGuide = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "admin" || userRole === "tourmanager";
  };

  const userRole = localStorage.getItem("userRole");

  const isNavbarVisible = localStorage.getItem("hideNavbar") !== "true"; // Hide navbar if flag is set

  async function login(userId = null) {
    setUserId(userId);
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }
 

  async function logout() {
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
     localStorage.removeItem("hideNavbar"); 
    window.location.reload();
  }
  const activeStyle = {
    fontWeight: "bold",
    color: "#f90",       // highlight color (orange)
    borderBottom: "2px solid #f90",
    paddingBottom: "4px",
  };
    const location = useLocation();

 const currentPath = location.pathname;
  return (
    <Router>
      <div className="App min-vh-100" style={{ backgroundColor: "#f7f7f7" }}>
      {isNavbarVisible && userRole !== "admin" && (
        <nav className={`navbar-fixed-top ${styles.nav}`}>
          <div className={`container ${styles.parentnav}`}>
            <img src={logo} alt="Travelo logo" className={styles.logo} />
            <div className={styles.topnav_center}>
              <ul>
                <li>
                  <Link
                    to="/home"
                    style={currentPath === "/home" ? activeStyle : undefined}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view/hotel"
                    style={currentPath === "/view/hotel" ? activeStyle : undefined}
                  >
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guidereport"
                    style={currentPath === "/guidereport" ? activeStyle : undefined}
                  >
                    Tour Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view/cuspackage"
                    style={currentPath === "/view/cuspackage" ? activeStyle : undefined}
                  >
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/thingstodo"
                    style={currentPath === "/thingstodo" ? activeStyle : undefined}
                  >
                    Things To Do
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tour-updates"
                    style={currentPath === "/tour-updates" ? activeStyle : undefined}
                  >
                    Tour Updates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Profile and Login/Logout */}
            <div className="d-flex align-items-center">
              {userId && (
                <a
                  href={`/profile/home/${userId}`}
                  className="d-flex align-items-center me-3"
                  onClick={(e) => {
                    if (!userId) {
                      localStorage.setItem("hideNavbar", "false");
                    } else {
                      localStorage.setItem("hideNavbar", "true");
                    }
                    window.location.href = `/profile/home/${userId}`;
                    window.location.reload();
                  }}
                >
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "2.5rem", color: "#000" }}
                  ></i>
                </a>
              )}

              {userId ? (
                <Link to={"/home"} onClick={logout} className={styles.btn_login}>
                  Logout
                </Link>
              ) : (
                <Link to={"/user/login"} className={styles.btn_login}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}



        <div>
          <Switch>
            <Route exact path="/">
              <Redirect
                to={
                  localStorage.getItem("userRole") === "admin"
                    ? "/admin/dashboard"
                    : "/home"
                }
              />
            </Route>

            {/* Define routes for non-admin users */}
            <Route path="/home" component={Home} />
            <Route path="/trekking" component={Trekking} />
            <Route path="/zipflying" component={Zipflying} />
            <Route path="/skydiving" component={Skydiving} />
            <Route path="/bungeejumping" component={Bungee} />
            <Route path="/motorbiking" component={MotorBiking} />
            <Route path="/rafting" component={Rafting} />
            <Route path="/canyoying" component={Canyoying} />
            <Route path="/mountainbiking" component={MountainBiking} />
            <Route path="/paragliding" component={Paragliding} />

            <Route
              path="/add/payment+details"
              render={(props) => <AddPayment {...props} userId={userId} />}
            />
            <Route
              path={`/view/payment+details/${userId}`}
              render={(props) => <DisplayPayment {...props} userId={userId} />}
            />
            <Route
              path={`/update/payment+details/${userId}`}
              render={(props) => <UpdatePayment {...props} userId={userId} />}
            />
            <Route
              path={`/profile/home/${userId}`}
              render={(props) => <UserProfile {...props} userId={userId} />}
            />
            <Route
              path={`/profile/reservedTourGuides/${userId}`}
              render={(props) => (
                <ReservedTourGuides {...props} userId={userId} />
              )}
            />
            <Route
              path={`/profile/reservedpackages/${userId}`}
              render={(props) => (
                <ReservedPackages {...props} userId={userId} />
              )}
            />
            <Route
              path={`/profile/reservedhotels/:userId`}
              render={(props) => <ReservedHotel {...props} userId={userId} />}
            />

            <Route path="/new+user/signup" component={Signup} />
            <Route
              path="/user/login"
              render={(props) => <Login {...props} login={login} />}
            />
            <Route
              path={`/view/payment+history/${userId}`}
              render={(props) => <PaymentHistory {...props} userId={userId} />}
            />
            <Route
              path={`/print/payment+history`}
              render={(props) => <PrintPayments {...props} userId={userId} />}
            />
            <Route
              path={`/checkout`}
              render={(props) => <Checkout {...props} userId={userId} />}
            />

            <Route path="/all/tourguide" component={AllTourguides} />
            <Route path="/add/tourguide" render={(props) => <AddTourguide {...props} />} />

            <Route path="/update/tourguide/:id" component={UpdateTourguide} />
            <Route path="/admin/hotel" component={Navbar} />
            <Route
              path={`/insert/hotel/:hotelId`}
              component={HotelReservation}
            />
            <Route path="/add/hotel" component={AddHotel} />
            <Route path="/all/hotel" component={AllHotel} />
            <Route path="/update/hotel/:id" component={EditHotel} />
            
            <Route path="/view/hotel" component={ViewHotel} />
            <Route path="/report" component={Report} />
            <Route path="/book/hotel" component={BookingHotel} />
            <Route path="/add/package" component={AddPackage} />
            <Route path="/man" component={Manager} />
            <Route path="/sith" component={Sith} />
            <Route path="/view/cuspackage" component={CusPack} />
            <Route path="/all/user" component={AllUser} />
            <Route
              path="/customize/package"
              render={(props) => <CusPackage {...props} userId={userId} />}
            />
            <Route path="/manage/AllPacks" component={AllPacks} />
            <Route path="/update/package/:id" component={EditPack} />
            <Route path="/guidereport" component={GuideReport} />
            <Route
              path={`/view/my-feedbacks/:userId`}
              render={(props) => <MyFeedbacks {...props} userId={userId} />}
            />
            <Route
              path="/find/package/:userId"
              render={(props) => (
                <FindMyPack {...props} userId={props.match.params.userId} />
              )}
            />
            <Route path="/find/package" component={FindMyPack} />
            <Route
              path="/edit/cuspack/:id/:userId?"
              render={(props) => (
                <EditCusPack {...props} userId={props.match.params.userId} />
              )}
            />
            <Route path="/tour-guide-faq" component={TourGuideFAQ} />
            <Route path="/tour-updates" component={TourUpdates} />

            <Route path="/adminTourguide" component={TourGuideConfirmation} />

            <Route path="/adminHotel" component={HotelReservationConfirmation} />

            <Route path="/adminPackage" component={PackageConfirmation} />

            <Route path="/package-details/:packageId" component={PackageDetails} />

            <Route path="/adminTourupdates" component={TourUpdateForm} />

            <Route path="/tourguide/dashboard" component={TourGuideDashboard} />

            <Route path="/add/details" component={TourguideAdditionalInfo} />

            
            <Route path="/tourguide/profile" component={TourGuideProfile} />

            <Route path="/thingstodo" component={ThingsToDo} /> 

            {/* Admin Route */}
            <Route
              path="/admin/dashboard"
              render={(props) =>
                localStorage.getItem("userRole") === "admin" ? (
                  <AdminDashboard {...props} />
                ) : (
                  <Redirect to="/user/login" />
                )
              }
            />
            <Route
              path="/admin/tourguides"
              render={(props) =>
                localStorage.getItem("userRole") === "admin" ? (
                  <AdminTourGuideView {...props} />
                ) : (
                  <Redirect to="/user/login" />
                )
              }
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
