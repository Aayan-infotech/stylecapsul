import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../../src/components/helpandsupport/contactuse.scss";

const TermsConditions = () => {

    const termsAndConditions = [
        {
            title: "Acceptance of Terms",
            content: "By using My Style Capsule, you agree to comply with these terms and conditions.",
        },
        {
            title: "User Accounts & Responsibilities",
            content: "You are responsible for maintaining the confidentiality of your account credentials.",
        },
        {
            title: "Use of Services",
            content: "You may not use our services for any illegal or unauthorized purposes.",
        },
        {
            title: "Intellectual Property",
            content: "All content, including images, designs, and code, are the intellectual property of My Style Capsule.",
        },
        {
            title: "Subscription & Payments",
            content: "Certain features may require a subscription. Payments are processed securely through third-party providers.",
        },
        {
            title: "Returns & Refunds",
            content: "Refunds are available only under specific conditions, as outlined in our refund policy.",
        },
        {
            title: "User-Generated Content",
            content: "By sharing outfits or images, you grant us a non-exclusive license to display them on our platform.",
        },
        {
            title: "Limitation of Liability",
            content: "We are not responsible for any damages resulting from your use of our platform.",
        },
        {
            title: "Termination of Account",
            content: "We reserve the right to suspend or terminate accounts that violate our policies.",
        },
        {
            title: "Changes to Terms & Conditions",
            content: "We may update these terms, and it is your responsibility to review them periodically.",
        },
    ];


    return (
        <div className="container d-block my-4 termsconditoins">
            <Box>
                <h2 className="text-center mb-4">Terms & Conditions</h2>
                <ul className="list-group">
                    {termsAndConditions?.map((point, index) => (
                        <li key={index} className="rounded-pill p-3 mx-4 px-5 mb-2 list-group-item">
                            <h4 className="fw-bold">{point.title}</h4>
                            <p className="mb-0">{point.content}</p>
                        </li>
                    ))}
                </ul>
            </Box>
        </div>
    );
};

export default TermsConditions;
