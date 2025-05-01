import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reduxToolkit/loginSlice";
import "./Login.scss";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      showErrorToast("Email is required");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      showErrorToast("Invalid email format");
      return false;
    }
    if (!formData.password) {
      showErrorToast("Password is required");
      return false;
    } else if (formData.password.length < 6) {
      showErrorToast("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setBtnLoader(true);
    try {
      const addedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      const products = addedProducts.map((item) => ({ productId: item._id, quantity: item.quantity, }));
      const payload = { ...formData, products: products, };
      const resultAction = await dispatch(loginUser(payload)).unwrap();
      showSuccessToast(resultAction?.message);
      if (resultAction?.success === true && resultAction?.status === 200) {
        if (location?.state?.fromChat) {
          navigate("/chat", {
            state: { profile_details: location?.state?.profile_details },
          });
        } else {
          const redirectPath = location.state?.fromCheckout ? "/cart" : "/";
          navigate(redirectPath);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      showErrorToast(errorMessage);
    } finally {
      setBtnLoader(false);
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);


  return (
    <>
      <div className="custom-container">
        <div className="w-100">
          <Link to="/" className="text-black text-decoration-none">
            <h1 className="text-center outside-heading fs-1 fw-bold">
              Style Capsule
            </h1>
          </Link>
          <div className="card custom-card border-0 p-2">
            <div className="card-body p-4 text-black">
              <h2 className="card-title fs-4 text-center fw-bold">Login</h2>
              <form className="mt-4" onSubmit={handleLogin}>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label fw-bold">  Enter Email</label>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control rounded-pill" placeholder="Enter Email" />
                </div>
                <div className="mb-2 position-relative">
                  <label htmlFor="password" className="form-label fw-bold">  Password</label>
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="form-control rounded-pill" placeholder="Password" />
                  <button type="button" className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y" onClick={togglePasswordVisibility} style={{ background: "none", border: "none" }}>
                    <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                    <Link to="/forgot-password" className="text-decoration-none text-black">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="form-check">
                    <input className="text-black me-1" type="checkbox" value="" id="flexCheckDefault" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="btn custom-button text-white fw-bold rounded-pill w-75 p-2">
                    {btnLoader ? (
                      <span>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                        Logging...
                      </span>
                    ) : (
                      "Login"
                    )}
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
