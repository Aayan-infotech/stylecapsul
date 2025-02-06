// import React from "react";
// import { useLocation, Outlet } from "react-router-dom";
// import Navbar from '../src/components/Navbar/Navbar.jsx';
// import Footer from "../src/components/Footer/Footer.jsx";

// const MainLayout = () => {
//   const location = useLocation();
//   const showNavbar = location.pathname !== "/market-place";

//   const layoutStyle = {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//   };

//   const contentStyle = {
//     flex: 1,
//   };
  
//   return (
//     <>
//       {showNavbar && <Navbar />}
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// export default MainLayout;
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from "../src/components/Footer/Footer.jsx";

const MainLayout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/market-place";

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={layoutStyle}>
      {showNavbar && <Navbar />}
      <div style={contentStyle}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
