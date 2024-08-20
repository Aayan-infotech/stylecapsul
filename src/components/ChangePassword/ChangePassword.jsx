import React from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/ChangePassword.scss";

const ChangePassword = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center change-password-container">
                <div className="container">
                    <h1 className="text-center fw-bold fs-1">Change Password</h1>
                    <div className="card password-card-container">
                        <div className="card-body p-5">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="oldpassword" className="form-label">Old Password</label>
                                    <input type="password" id="oldpassword" className="form-control rounded-pill" placeholder='Enter Your Password' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newpassword" className="form-label">New Password</label>
                                    <input type="password" id="newpassword" className="form-control rounded-pill" placeholder='Enter New Password' />
                                </div>
                                <div>
                                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                                    <input type="password" id="confirmpassword" className="form-control rounded-pill" placeholder='Enter Confirm Password' />
                                </div>
                            </form>
                        </div>
                        <button
                            type="button"
                            className="rounded-pill fw-bold btn btn-light passwrod-submit-btn"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
