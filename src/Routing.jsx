import React, { useState, useEffect } from "react";
import "./Routing.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import RecoveryCode from "./components/RecoveryCode/RecoveryCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SettingAndSecurity from "./components/settingssecurity/settingAndSecurity.jsx";
import ClosetManagement from "./components/closemanagement/ClosetManagement.jsx";
import Cart from "./components/cart/Cart.jsx";
import MarketPlace from "./components/marketPlace/MarketPlace.jsx";
import MyStyleCapsul from "./components/mystylecapsul/MyStyleCapsul.jsx";
import AddClothes from "./components/addClothes/AddClothes.jsx";
import Stylist from "./components/stylist/stylist.jsx";
import GiftCards from "./components/giftcards/GiftCards.jsx";
import AnalyticsInsights from "./components/analyticsInsights/AnalyticsInsights.jsx";
import HelpAndSupport from "./components/helpandsupport/HelpSupport.jsx";
import ClosetOverview from "./components/closetoverview/ClosetOverview.jsx";
import MyCapsuleAddAvtart from "./components/myCapsuleAddAvtart/MyCapsuleAddAvtart.jsx";
import TryAvtar from "./components/tryavtar/TryAvtar.jsx";
import AvtarLookingCool from "./components/avtartlooking/AvtarLookingCool.jsx";

import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProfileAvatar from "./components/ProfileAvatar/ProfileAvatar";
import ProfileBody from "./components/ProfileBody/ProfileBody";
import PandQ from "./components/PandQ/PandQ";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import FullAvatar from "./components/FullAvatar/FullAvatar";
import Body from "./components/Body/Body";
import Appointment from "./components/Appointment/Appointment";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import MyAddedProducts from "./components/MyAddedProducts/MyAddedProducts";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import CalendarStyleCapsule from "./components/CalendarStyleCapsule/CalendarStyleCapsule";
import EmojiStyleCapsule from "./components/EmojiStyleCapsule/EmojiStyleCapsule";

// import { useSelector } from "react-redux";
// import { useLocation, Outlet } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";

// Layout Component
// const MainLayout = () => {
//   const location = useLocation();
//   const showNabar = location.pathname !== '/market-place';
//   const user = useSelector((state) => state.login.user);
//   if (!user) {
//     return <Navigate to="/login" />;
//   }


//   return (
//     <>
//       {showNabar && <Navbar />}
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// const ProtectedRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };



// App Component
const Routing = () => {
  const isAuthenticated = useSelector((state) => state.login.user);
  // console.log(isAuthenticated, 'isAuthenticated')

  return (
    <Router>
      <Routes>
        {/* Routes that do not require Navbar and Footer */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recovery-code" element={<RecoveryCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Routes that require Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/edit-profile-avatar" element={isAuthenticated ? <ProfileAvatar /> : <Navigate to="/login" replace />} />
          <Route path="/edit-profile-body" element={isAuthenticated ? <ProfileBody /> : <Navigate to="/login" replace />} />
          <Route path="/pq" element={isAuthenticated ? <PandQ /> : <Navigate to="/login" replace />} />
          <Route path="/full-avatar" element={isAuthenticated ? <FullAvatar /> : <Navigate to="/login" replace />} />
          <Route path="/body" element={isAuthenticated ? <Body /> : <Navigate to="/login" replace />} />
          <Route path="/scheduled-appointment" element={isAuthenticated ? <Appointment /> : <Navigate to="/login" replace />} />
          <Route path="/setting-and-security" element={isAuthenticated ? <SettingAndSecurity /> : <Navigate to="/login" replace />} />
          <Route path="/closet-management" element={isAuthenticated ? <ClosetManagement /> : <Navigate to="/login" replace />} />
          <Route path="/market-place" element={isAuthenticated ? <MarketPlace /> : <Navigate to="/login" replace />} />
          <Route path="/my-style-capsule" element={isAuthenticated ? <MyStyleCapsul /> : <Navigate to="/login" replace />} />
          <Route path="/add-clothes" element={isAuthenticated ? <AddClothes /> : <Navigate to="/login" replace />} />
          <Route path="/stylist" element={isAuthenticated ? <Stylist /> : <Navigate to="/login" replace />} />
          <Route path="/gift-cards" element={isAuthenticated ? <GiftCards /> : <Navigate to="/login" replace />} />
          <Route path="/analytics-insights" element={isAuthenticated ? <AnalyticsInsights /> : <Navigate to="/login" replace />} />
          <Route path="/help-support" element={isAuthenticated ? <HelpAndSupport /> : <Navigate to="/login" replace />} />
          <Route path="/closet-overview" element={isAuthenticated ? <ClosetOverview /> : <Navigate to="/login" replace />} />
          <Route path="/myCapsuleAddAvtart" element={isAuthenticated ? <MyCapsuleAddAvtart /> : <Navigate to="/login" replace />} />
          <Route path="/try-avtar" element={isAuthenticated ? <TryAvtar /> : <Navigate to="/login" replace />} />
          <Route path="/avtarlookingcool" element={isAuthenticated ? <AvtarLookingCool /> : <Navigate to="/login" replace />} />
          <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" replace />} />
          <Route path="/myaddedproducts" element={isAuthenticated ? <MyAddedProducts /> : <Navigate to="/login" replace />} />
          <Route path="/orderhistory" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" replace />} />
          <Route path="/calendarstylecapsule" element={isAuthenticated ? <CalendarStyleCapsule /> : <Navigate to="/login" replace />} />
          <Route path="/emojistylecapsule" element={isAuthenticated ? <EmojiStyleCapsule /> : <Navigate to="/login" replace />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
