import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChangePassword } from "../../reduxToolkit/changePasswordSlice";
import "../../styles/ChangePassword.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../utils/cookieUtils";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useSelector((state) => state.login);
  const token = getCookie('authToken');
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userId = user?.payload?._id;

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const changepassresult = await dispatch(
        userChangePassword({
          userId,
          oldPassword,
          newPassword,
          newConfirmPassword: confirmPassword,
          token
        })
      );

      if (userChangePassword.fulfilled.match(changepassresult)) {
        const { message } = changepassresult.payload;
        toast.success(message, {
          autoClose: 1000,
          hideProgressBar: true,
          style: {
            backgroundColor: "black",
            color: "#C8B199",
            borderRadius: "50px",
            padding: "10px 20px",
          },
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(changepassresult.payload?.message || "Unknown error");
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage, {
        autoClose: 2000,
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="change-password-container">
        <h1 className="text-center fw-bold fs-1">Change Password</h1>
        <div className="container" style={{display:"block"}}>
          <div className="card password-card-container">
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-2 position-relative">
                  <label htmlFor="oldpassword" className="form-label fw-bold">
                    Old Password
                  </label>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldpassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Enter Old Password"
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                    onClick={() => togglePasswordVisibility(setShowOldPassword)}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      className={`fa-solid ${
                        showOldPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="mb-2 position-relative">
                  <label htmlFor="newpassword" className="form-label fw-bold">
                    New Password
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newpassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Enter New Password"
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                    onClick={() => togglePasswordVisibility(setShowNewPassword)}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      className={`fa-solid ${
                        showNewPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="mb-2 position-relative">
                  <label
                    htmlFor="confirmpassword"
                    className="form-label fw-bold"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Confirm New Password"
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                    onClick={() =>
                      togglePasswordVisibility(setShowConfirmPassword)
                    }
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      className={`fa-solid ${
                        showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
                <button
                  type="submit"
                  className="rounded-pill fw-bold btn btn-light chagne-passwrod-submit-btn"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
