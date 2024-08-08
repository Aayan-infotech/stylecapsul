import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
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

// Layout Component
const MainLayout = () => {
  const location = useLocation();
  const showNabar = location.pathname !== '/market-place';

  return (
    <>
      {showNabar && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
};

// App Component
const Routing = () => {
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
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile-avatar" element={<ProfileAvatar />} />
          <Route path="/edit-profile-body" element={<ProfileBody />} />
          <Route path="/pq" element={<PandQ />} />
          <Route path="/full-avatar" element={<FullAvatar />} />
          <Route path="/body" element={<Body />} />
          <Route path="/scheduled-appointment" element={<Appointment />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/SettingAndSecurity" element={<SettingAndSecurity />} />
          <Route path="/closetManagement" element={<ClosetManagement />} />
          <Route path="/market-place" element={<MarketPlace />} />
          <Route path="/myStyle-capsule" element={<MyStyleCapsul />} />
          <Route path="/add-clothes" element={<AddClothes />} />
          <Route path="/stylist" element={<Stylist />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/analytics-insights" element={<AnalyticsInsights />} />
          <Route path="/help-support" element={<HelpAndSupport />} />
          <Route path="/closet-overview" element={<ClosetOverview />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
