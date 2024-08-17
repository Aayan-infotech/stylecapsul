import React from "react";
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
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";

const AuthRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.login.user);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
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
          <Route path="/home" element={<AuthRoute element={<Home />} />} />
          <Route path="/profile" element={<AuthRoute element={<Profile />} />} />
          <Route path="/edit-profile-avatar" element={<AuthRoute element={<ProfileAvatar />} />} />
          <Route path="/edit-profile-body" element={<AuthRoute element={<ProfileBody />} />} />
          <Route path="/pq" element={<AuthRoute element={<PandQ />} />} />
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
          <Route path="/myCapsuleAddAvtart" element={<MyCapsuleAddAvtart />} />
          <Route path="/try-avtar" element={<TryAvtar />} />
          <Route path="/avtarlookingcool" element={<AvtarLookingCool />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/myaddedproducts" element={<MyAddedProducts />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/calendarstylecapsule" element={<CalendarStyleCapsule />} />
          <Route path="/emojistylecapsule" element={<EmojiStyleCapsule />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
