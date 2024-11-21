import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from "../src/components/Footer/Footer.jsx";

const MainLayout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/market-place";

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
