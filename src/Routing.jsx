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
import MyAddedProducts from "./components/MyAddedProducts/MyAddedProducts.jsx";
import OrderHistory from "./components/OrderHistory/OrderHistory";
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
import Chat from "./components/stylist/Chat.jsx";
import StylistCategories from "./components/stylist/StylistCategories.jsx";
import CategoryDetails from "./components/stylist/CategoryDetials.jsx";
import Address from "./components/stylist/Address.jsx";
import Payment from "./components/stylist/Payment.jsx";
import ThankuPage from "./components/stylist/ThankuPage.jsx";
import AuthRoute from "./AuthRoute.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
import { ClossetDetails } from "./components/ClossetDetails/ClossetDetails.jsx";
import Explore from "./components/explore/Explore.jsx";
import { SocialUserDetails } from "./components/explore/SocialUserDetails.jsx";
import { Cloths } from "./components/explore/Cloths.jsx";
import { ClothsDetails } from "./components/explore/ClothsDetails.jsx";
import { CapsuleRangeCalendarDetails } from "./components/explore/CapsuleRangeCalendarDetails.jsx";
import ExploreUserProfileDetails from "./components/explore/ExploreUserProfileDetails.jsx";
import CheckoutForm from "./components/stylist/CheckoutForm.jsx";
import ContactPage from "./components/helpandsupport/ContactPage.jsx";
import PrivacyPolicy from "./components/helpandsupport/PrivacyPolicy.jsx";
import TermsConditions from "./components/helpandsupport/TermsConditions.jsx";
import OtherPostUserDetails from "./components/explore/OtherPostUserDetails.jsx";
import ClosetAddedProducts from "./components/marketPlace/ClosetAddedProducts.jsx";

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
            <Route path="/setting-and-security" element={<SettingAndSecurity />}/>
            <Route path="/closet-management" element={<ClosetManagement />} />
            <Route path="/closet-categories" element={<ClosetCategories />} />
            <Route path="/stylescan" element={<StyleScan />}/>
            <Route path="/upload-image-scan" element={<UploadScanImage />} />
            <Route path="/scanned-image-wardrobe" element={<ScannedImageWardrobe />}/>
            <Route path="/market-place" element={<MarketPlace />} />
            <Route path="/closet-added-products" element={<ClosetAddedProducts />} />
            <Route path="/my-style-capsule" element={<MyStyleCapsul />} />
            <Route path="/add-clothes" element={<AddClothes />} />
            <Route path="/all-clothes-list/:category" element={<ClothesList />}/>
            <Route path="/clothes-details/:clothid" element={<ShowClothesDetails />} />
            <Route path="/stylist" element={<Stylist />} />
            <Route path="/stylist-profile/:stylistId" element={<StylistDetails />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/categories-type/:categoryId" element={<StylistCategories />}/>
            <Route path="/category-details/:subcatid" element={<CategoryDetails />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/thanku" element={<ThankuPage />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/gift-card-details/:id" element={<GiftCardDetails />}/>
            <Route path="/analytics-insights" element={<AnalyticsInsights />} />
            <Route path="/help-support" element={<HelpAndSupport />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/termsConditions" element={<TermsConditions />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/closet-overview" element={<ClosetOverview />} />
            <Route path="/myCapsuleAddAvtart" element={<MyCapsuleAddAvtart />}/>
            <Route path="/try-avtar" element={<TryAvtar />} />
            <Route path="/avtarlookingcool" element={<AvtarLookingCool />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/closet-details" element={<ClossetDetails />} />
            <Route path="/emojistylecapsule" element={<EmojiStyleCapsule />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/garment-care" element={<GarmentsCare />} />
            <Route path="/service-provider/:garmentId" element={<ServiceProvider />}/>
            <Route path="/schedule-booking" element={<ScheduleBooking />} />
            -------------------------------social media-----------------
            <Route path="/explore" element={<Explore />} />
            <Route path="/checkoutForm" element={<CheckoutForm />} />
            <Route path="/socialUserDetails/:postId" element={<SocialUserDetails />} />
            <Route path="/cloths" element={<Cloths />} />
            <Route path="/cloths-details/:id" element={<ClothsDetails />} />
            <Route path="/capsulerangecalendardetails" element={<CapsuleRangeCalendarDetails />}/>
            <Route path="/public-profile/:userId/:categoryId" element={<OtherPostUserDetails />}/>
            <Route path="/user-profile" element={<ExploreUserProfileDetails />}/>
            
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthRoute>
    </Router>
  );
};

export default Routing;