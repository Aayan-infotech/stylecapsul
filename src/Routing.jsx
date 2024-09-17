import React, { useState, useEffect } from "react";
import "./Routing.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProfileAvatar from "./components/ProfileAvatar/ProfileAvatar";
import PandQ from "./components/PandQ/PandQ";
import FullAvatar from "./components/FullAvatar/FullAvatar";
import Body from "./components/Body/Body";
import Appointment from "./components/Appointment/Appointment";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import MyAddedProducts from "./components/MyAddedProducts/MyAddedProducts";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import CalendarStyleCapsule from "./components/CalendarStyleCapsule/CalendarStyleCapsule";
import EmojiStyleCapsule from "./components/EmojiStyleCapsule/EmojiStyleCapsule";
import MainLayout from "./MainLayout";
import GarmentsCare from "./components/garments/GarmentsCare.jsx";
import ServiceProvider from "./components/serviceprovider/ServiceProvider.jsx";
import ScheduleBooking from "./components/schedulebooking/ScheduleBooking.jsx";
import GiftCardDetails from "./components/giftcards/GiftCardDetails.jsx";
import StylistDetails from "./components/stylist/StylistDetails.jsx";
import ClothesList from "./components/addClothes/ClothesList.jsx";
import ShowClothesDetails from "./components/addClothes/ShowClothesDetails.jsx";
import ClosetCategories from "./components/closemanagement/ClosetCategories.jsx";
import StyleScan from "./components/closemanagement/StyleScan.jsx";
import UploadScanImage from "./components/closemanagement/UploadScanImage.jsx";
import ScannedImageWardrobe from "./components/closemanagement/ScannedImageWardrobe.jsx";
import StylistMessageList from "./components/stylist/StylistMessageList.jsx";
import Chat from "./components/stylist/Chat.jsx";
import StylistCategories from "./components/stylist/StylistCategories.jsx";
import CategoryDetails from "./components/stylist/CategoryDetials.jsx";
import Address from "./components/stylist/Address.jsx";
import Payment from "./components/stylist/Payment.jsx";
import ThankuPage from "./components/stylist/ThankuPage.jsx";
import AuthRoute from "./AuthRoute.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";

const Routing = () => {

  return (
    <Router>
      <AuthRoute>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile-avatar" element={<ProfileAvatar />} />
            <Route path="/pq" element={<PandQ />} />
            <Route path="/full-avatar" element={<FullAvatar />} />
            <Route path="/body" element={<Body />} />
            <Route path="/scheduled-appointment" element={<Appointment />} />
            <Route path="/setting-and-security" element={<SettingAndSecurity />} />
            <Route path="/closet-management" element={<ClosetManagement />} />
            <Route path="/closet-categories" element={<ClosetCategories />} />
            <Route path="/close-management_style_scan" element={<StyleScan />} />
            <Route path="/upload-image-scan" element={<UploadScanImage />} />
            <Route path="/scanned-image-wardrobe" element={<ScannedImageWardrobe />} />
            <Route path="/market-place" element={<MarketPlace />} />
            <Route path="/my-style-capsule" element={<MyStyleCapsul />} />
            <Route path="/add-clothes" element={<AddClothes />} />
            <Route path="/all-clothes-list/:category" element={<ClothesList />} />
            <Route path="/clothes-details" element={<ShowClothesDetails />} />
            <Route path="/stylist" element={<Stylist />} />
            <Route path="/stylist-profile" element={<StylistDetails />} />
            <Route path="/stylist-list" element={<StylistMessageList />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/categories-type" element={<StylistCategories />} />
            <Route path="/category-details" element={<CategoryDetails />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/thanku" element={<ThankuPage />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/gift-card-details/:id" element={<GiftCardDetails />} />
            <Route path="/analytics-insights" element={<AnalyticsInsights />} />
            <Route path="/help-support" element={<HelpAndSupport />} />
            <Route path="/closet-overview" element={<ClosetOverview />} />
            <Route path="/myCapsuleAddAvtart" element={<MyCapsuleAddAvtart />} />
            <Route path="/try-avtar" element={<TryAvtar />} />
            <Route path="/avtarlookingcool" element={<AvtarLookingCool />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/myaddedproducts" element={<MyAddedProducts />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/calendarstylecapsule" element={<CalendarStyleCapsule />} />
            <Route path="/emojistylecapsule" element={<EmojiStyleCapsule />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/garment-care" element={<GarmentsCare />} />
            <Route path="/service-provider" element={<ServiceProvider />} />
            <Route path="/schedule-booking" element={<ScheduleBooking />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthRoute>
    </Router>
  );
};
export default Routing;