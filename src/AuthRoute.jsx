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
    const token = useSelector((state) => state?.login?.token);
    const user = useSelector((state) => state?.login?.user);
    // const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = getCookie('userId');
            if (userId) {
                const userResponse = await axios.get(apiUrl(`api/user/get/${userId}`),);
                dispatch(updateUserDetails(userResponse?.data?.data))
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
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
    }, [token, user]);

    useEffect(() => {
        const interval = setInterval(() => {
            const isValid = checkToken();
            if (!isValid && token) {
                dispatch(logoutUser());
                // navigate("/login");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch, token]);

    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    if (isAuth === null) {
        return <div className="loading-screen">Checking authentication...</div>;
    }

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
