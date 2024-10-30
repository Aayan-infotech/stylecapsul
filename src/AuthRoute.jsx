import React, { useEffect, useState } from 'react'
import { checkToken } from './utils/auth.util';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Routing.css";
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import RecoveryCode from './components/RecoveryCode/RecoveryCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './utils/cookieUtils';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'

import axios from 'axios';
import { apiUrl } from '../apiUtils';
import { updateUserDetails } from './reduxToolkit/loginSlice';
import Explore from './components/explore/Explore.jsx';
import { SocialUserDetails } from './components/explore/SocialUserDetails.jsx';

const AuthRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state?.login?.token);
    const user = useSelector((state) => state?.login?.user);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = getCookie('userId');
            if (userId) {
                const userResponse = await axios.get(apiUrl(`api/user/get/${userId}`), );
                dispatch(updateUserDetails(userResponse?.data?.data))
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            if (checkToken() && user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        };
        checkAuth();
    }, [token, user]);

    if (isAuth) {
        return <>{children}</>;
    } else return <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recovery-code" element={<RecoveryCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/explore" element={<Explore isAuth={isAuth} />} />
        <Route path="/socialUserDetails" element={<SocialUserDetails />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>;
}
export default AuthRoute
