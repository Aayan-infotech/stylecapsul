import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../../reduxToolkit/signUpSlice";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [category, setCategory] = useState([]);
  // const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9006/api/signature/get_all_signature_details");
        // setCategory(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: formData.firstName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      setSuccess("Signup successful");
      setError("");
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center full-height">
      <div className="">
        <h1 className="text-center outside-heading fs-1 fw-bold">
          Style Capsule
        </h1>
        {error && <div className="error">{error}</div>}
        <ul>
          {category.map((cat) => (
            <li style={{ cursor: "pointer" }} key={cat._id}>
              {cat.Name}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="row gy-4 mt-1">
            <h2 className="card-title text-center fs-4 fw-bold">Sign Up</h2>
            <div className="col-12 col-md-4 mt-4">
              <div>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-black fw-bold"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter Your Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-md-4 mt-4">
              <div>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-black fw-bold"
                >
                  Enter Email or Phone Number
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter Email or Phone Number"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-black fw-bold"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
              <div className="mb-2 position-relative custom-password-input">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-pill"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                  onClick={togglePasswordVisibility}
                  style={{ background: "none", border: "none" }}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-start align-items-center">
              <div className="mb-2 position-relative custom-password-input">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control rounded-pill"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ background: "none", border: "none" }}
                >
                  <i
                    className={`fa-solid ${
                      showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="login-button fw-bold"
                disabled={status === "loading"}
              >
                Sign Up
              </button>
            </div>
            {error && (
              <div className="text-center mt-2 text-danger">{error}</div>
            )}
            <div className="text-center mt-2">
              <span>Already have an account? </span>
              <Link to="/login" className="text-black">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
