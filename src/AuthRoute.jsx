import React, { useEffect, useState } from 'react'
import { checkToken } from './utils/auth.util';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import Signup from './components/Signup/Signup';
import "./Routing.css";
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import RecoveryCode from './components/RecoveryCode/RecoveryCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './utils/cookieUtils';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'

import axios from 'axios';
import { apiUrl } from '../apiUtils';
import { logoutUser, updateUserDetails } from './reduxToolkit/loginSlice';
import MyAddedProducts from './components/MyAddedProducts/MyAddedProducts.jsx';
import Stylist from './components/stylist/stylist.jsx';
import StylistDetails from './components/stylist/StylistDetails.jsx';
import Chat from './components/stylist/Chat.jsx';
import MarketPlace from './components/marketPlace/MarketPlace.jsx';
import StylistCategories from './components/stylist/StylistCategories.jsx';

const AuthRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state?.login);
    const token = loginState?.token;
    const user = loginState?.user;
    const loginStatus = loginState?.status;

    useEffect(() => {
        if (loginStatus === "loading") return;
        const checkAuth = async () => {
            setLoading(true);
            if (checkToken() && user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            setLoading(false);
        };
        checkAuth();
    }, [token, user, loginStatus]);

    useEffect(() => {
        const interval = setInterval(() => {
            const isValid = checkToken();
            if (!isValid && token) {
                dispatch(logoutUser());
                window.location.href = "/";
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch, token]);

    // if (loading || loginStatus === 'loading') {
    //     return <div className="loading-screen">Loading...</div>;
    // }    

    if (isAuth) {
        return <>{children}</>;
    } else return <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/myaddedproducts" element={<MyAddedProducts />} />
        <Route path="/stylist" element={<Stylist />} />
        <Route path="/stylist-profile/:stylistId" element={<StylistDetails />} />
        <Route path="/market-place" element={<MarketPlace />} />
        <Route path="/categories-type/:categoryId" element={<StylistCategories />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recovery-code" element={<RecoveryCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<PageNotFound />} />
    </Routes>;
}
export default AuthRoute
