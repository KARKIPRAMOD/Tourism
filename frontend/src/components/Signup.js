import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../style_sheets/Login.module.css";

const Signup = () => {
  const [user_name, setUserName] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredpassword, setReEnteredPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [profile_image, setProfileImage] = useState(null);

  const history = useHistory();

  const validateForm = () => {
    if (
      !user_name ||
      !full_name ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !reEnteredpassword ||
      !profile_image
    ) {
      setError("Please fill in all fields.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (reEnteredpassword !== password) {
      setError("Passwords don't match!");
      return false;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms & conditions.");
      return false;
    }

    return true;
  };

  const addUser = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("user_name", user_name);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("role", role);

    // Append the selected profile image to the FormData
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    axios
      .post("http://localhost:8070/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert("Registration Successful!");
          history.push("/user/login");
        } else {
          setError(
            res.data.message || "Registration failed. Please try again."
          );
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      });
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
                <h2 className="mb-5">Sign up</h2>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={addUser}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      maxLength="10"
                      minLength="5"
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      maxLength="25"
                      minLength="51"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      maxLength="10"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="file"
                      id="profile_image"
                      className="form-control"
                      name="profile_image"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <select
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="user">Normal User</option>
                      <option value="tourguide">Tour Guide</option>
                    </select>
                    <label
                      className="form-label"
                      style={{ marginTop: "5px", color: "#585555" }}
                    >
                      Register as
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-enter Password"
                      onChange={(e) => setReEnteredPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div
                    className="form-check d-flex justify-content-start mb-4"
                    style={{ marginTop: "25px" }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      style={{ marginLeft: "10px", color: "#585555" }}
                    >
                      Agree to terms & conditions
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={styles.btn_login}
                    style={{ marginTop: "15px", width: "fit-content" }}
                  >
                    Sign up
                  </button>
                </form>

                <hr className="my-4" style={{ opacity: "0.15" }} />

                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Signin as Tour Guide </p>
                  <Link to={"/add/tourguide"}>Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
