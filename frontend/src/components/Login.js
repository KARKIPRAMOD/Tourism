import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

//import css file from style sheets directory
import styles from "../style_sheets/Login.module.css";

export default function Login({ login }) {
  const initialUserEnteredInfo = {
    user_name: "",
    password: "",
  };

  const [data, setData] = useState();
  const [userEnteredInfo, setUserEnteredInfo] = useState(
    initialUserEnteredInfo
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginType, setLoginType] = useState("user"); // Add state for login type
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserEnteredInfo({ ...userEnteredInfo, [name]: value });
  };

  function loginUser(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post("http://localhost:8070/user/login", userEnteredInfo)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          const userRole = res.data.user.role;
          localStorage.setItem("userRole", userRole);
          login(res.data.user._id);

          // Redirect based on role
          if (userRole === "admin") {
            history.push("/admin/dashboard");
          } else {
            window.location = "/home";
          }
        } else {
          setError(res.data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Login error:", err.response?.data || err.message);
        setError(
          err.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      });
  }

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Debug log for admin login attempt
      console.log(
        "Starting admin login attempt for:",
        userEnteredInfo.user_name
      );

      // Use "admin" for both username and password if that's what's entered
      const loginData =
        userEnteredInfo.user_name.toLowerCase() === "admin"
          ? { email: "admin", password: "admin" }
          : {
              email: userEnteredInfo.user_name,
              password: userEnteredInfo.password,
            };

      console.log(
        "Sending admin login request to:",
        "http://localhost:8070/admin/login"
      );
      const response = await fetch("http://localhost:8070/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Admin login response:", data);

      // Store the token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userId", data.userId);

      // Call login function and redirect
      login(data.userId);
      history.push("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      setError(
        `Login failed: ${error.message}. Please try using the regular login with username 'admin' and password 'admin'.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Determine which login handler to use based on login type
  const handleLogin = (e) => {
    if (loginType === "admin") {
      handleAdminLogin(e);
    } else {
      loginUser(e);
    }
  };

  return (
    <section className={styles.gradientForm}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{
                borderRadius: "15px",
                borderColor: "white",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="mb-4">
                  {loginType === "admin" ? "Admin Sign in" : "User Sign in"}
                </h2>

                {/* Login Type Toggle */}
                <div className="btn-group w-100 mb-4">
                  <button
                    type="button"
                    className={`btn ${
                      loginType === "user"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setLoginType("user")}
                  >
                    User Login
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      loginType === "admin"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setLoginType("admin")}
                  >
                    Admin Login
                  </button>
                </div>

                {/* Error display */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="user_name"
                    className="form-control"
                    placeholder={
                      loginType === "admin" ? "Admin Email" : "Username"
                    }
                    value={userEnteredInfo.user_name}
                    onChange={handleInputChange}
                    name="user_name"
                    disabled={loading}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={userEnteredInfo.password}
                    onChange={handleInputChange}
                    name="password"
                    disabled={loading}
                  />
                </div>

                <div
                  className="form-check d-flex justify-content-start mb-4"
                  style={{ marginTop: "25px" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="form1Example3"
                    style={{ marginLeft: "10px", color: "#585555" }}
                  >
                    Remember password
                  </label>
                </div>

                <button
                  className={`${styles.btn_login} w-100`}
                  style={{ marginTop: "15px" }}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <i className="bi bi-hourglass-split me-2"></i>
                      Loading...
                    </span>
                  ) : (
                    <span>
                      {loginType === "admin" ? "Admin Login" : "Login"}
                    </span>
                  )}
                </button>

                {/* Quick admin access button for testing */}
                <button
                  className="btn btn-secondary w-100 mt-3"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("userRole", "admin");
                    localStorage.setItem("userId", "admin_id");
                    login("admin_id");
                    history.push("/admin/dashboard");
                  }}
                  type="button"
                >
                  Quick Admin Access
                </button>

                <hr className="my-4" style={{ opacity: "0.15" }} />

                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Don't have an account?</p>
                  <Link to={"/new+user/signup"}>Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
