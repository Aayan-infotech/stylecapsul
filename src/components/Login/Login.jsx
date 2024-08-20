import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reduxToolkit/loginSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData)).unwrap();
      if (resultAction) {
        localStorage.setItem('authToken', resultAction.token); 
        toast.success('Login successful!', {
          autoClose: 1000,
          style: { backgroundColor: '#28a745', color: '#fff' }
        });
        navigate("/home"); 
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(errorMessage, {
        autoClose: 2000,
        style: { backgroundColor: '#dc3545', color: '#fff' }
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="custom-container mt-5">
        <div>
          <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
          <div className="card custom-card border-0">
            <div className="card-body p-5 text-black">
              <h2 className="card-title fs-4 text-center fw-bold">Login</h2>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label fw-bold">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control rounded-pill"
                    placeholder="Phone Number or Email"
                  />
                </div>
                <div className="mb-2 position-relative">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control rounded-pill"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                    onClick={togglePasswordVisibility}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                    ></i>
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none text-black"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="form-check">
                    <input
                      className="text-black me-1"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn custom-button text-white fw-bold rounded-pill w-75 p-2"
                  >
                    Login
                  </button>
                  <div className="signup-link">
                    <span>Doesn't have an account? </span>
                    <Link to="/signup" className="text-black fw-bold">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
