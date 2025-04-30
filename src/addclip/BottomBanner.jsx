import React, { useState } from "react";
import { Box, Button, Typography, Slide, Paper } from "@mui/material";

const BottomBanner = () => {
    const [open, setOpen] = useState(true);

    const handleAccept = () => {
        setOpen(false);
    };

    const handleReject = () => {
        setOpen(false);
    };

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper elevation={6} sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 9999, bgcolor: "lightGray", color: "black", p: 2, }} className="rounded-pill">
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                    <Typography variant="h5" sx={{ mb: { xs: 1, md: 0 } }}>
                        We use cookies and ads to personalize your experience.
                    </Typography>
                    <Box>
                        <button type="button" onClick={handleReject} className="btn btn-outline-dark fw-bold rounded-pill me-2">
                            <span>Reject</span>
                        </button>
                        <button type="button" onClick={handleAccept} className="btn btn-outline-dark fw-bold rounded-pill me-2">
                            <span>Accept</span>
                        </button>
                    </Box>
                </Box>
            </Paper>
        </Slide>
    );
};

export default BottomBanner;
