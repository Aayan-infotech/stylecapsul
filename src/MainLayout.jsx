import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from "../src/components/Footer/Footer.jsx";
import { loginUser } from '../src/reduxToolkit/loginSlice'; 

const MainLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.user);
  const showNavbar = location.pathname !== "/market-place";

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isAuthenticated) {
      dispatch(loginUser({ token }));
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated && !localStorage.getItem('authToken')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
