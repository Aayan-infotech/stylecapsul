// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ChangePassword.scss';

const ChangePassword = () => {
    return (
        <div className='change-password'>
            <div>
                <h1 className='password-heading'>Change Password</h1>
                <div className="card">
                    <form>
                        <div className="email-login">
                            <label htmlFor="old-password"><b>Old Password</b></label>
                            <input type="password" placeholder="Enter Your Password" name="oldpassword" required />
                            <div style={{ marginTop: '20px' }}>
                                <label htmlFor="newpassword"><b>New Password</b></label>
                                <input type="password" placeholder="Enter Your New Password" name="newpassword" required />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label htmlFor="confpassword"><b>Confirm Password</b></label>
                                <input type="password" placeholder="Enter Your New Password" name="conpassword" required />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button className="cta-btn">Submit</button>
        </div>
    );
};

export default ChangePassword;
