import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../../src/components/helpandsupport/contactuse.scss";
import { getCookie } from "../../utils/cookieUtils";
import { Link } from "react-router-dom";
import logo from "../../assets/images/LOGOSC.png";

const PrivacyPolicy = () => {

    const token = getCookie("authToken");
    const userId = getCookie("userId");

    const policyPoints = [
        {
            title: "Information We Collect",
            content: "We collect personal data such as name, email, profile preferences, and wardrobe details.",
        },
        {
            title: "How We Use Your Information",
            content: "Your data is used to personalize style recommendations, process payments, and enhance app features.",
        },
        {
            title: "Data Sharing & Third-Party Services",
            content: "We do not sell your data. However, we may share necessary information with payment processors and analytics providers.",
        },
        {
            title: "Virtual Try-On & 3D Clothing Privacy",
            content: "Images uploaded for 3D try-ons remain private and are temporarily stored for improving recommendations.",
        },
        {
            title: "User-Generated Content & Social Features",
            content: "You control who sees your shared outfits, and any public posts are visible to the community.",
        },
        {
            title: "Security Measures",
            content: "We implement encryption, multi-factor authentication, and security audits to protect your data.",
        },
        {
            title: "Your Rights & Data Control",
            content: "You can edit your profile, request data deletion, and opt out of marketing emails.",
        },
        {
            title: "Cookies & Tracking Technologies",
            content: "Cookies are used to store preferences, track analytics, and prevent fraud. You can manage cookies in browser settings.",
        },
        {
            title: "Children's Privacy",
            content: "Our services are not intended for users under 13. If a child’s data is collected, we delete it immediately.",
        },
        {
            title: "Changes to This Privacy Policy",
            content: "We may update this policy periodically and notify users via email and in-app messages.",
        },
    ];

    return (
        <div className="container d-block my-4 privacy-policy">
            <Box>
                <div className="row m-0 w-100">
                    <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
                        {!token && (
                            <Link to="/">
                                <img src={logo} alt="logo" style={{ width: "300px", height: "60px" }} />
                            </Link>
                        )}
                        <h4 className="fw-bold text-center text-md-start">Privacy Policy</h4>
                    </div>
                </div>
                <ul className="list-group">
                    {policyPoints?.map((point, index) => (
                        <li key={index} className="rounded-pill p-3 mx-4 mb-2 px-5 list-group-item">
                            <h4 className="fw-bold">{point.title}</h4>
                            <p className="mb-0">{point.content}</p>
                        </li>
                    ))}
                </ul>
            </Box>
        </div>
    );
};

export default PrivacyPolicy;
