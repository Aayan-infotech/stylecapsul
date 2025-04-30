import React, { useState, useEffect } from "react";
import { Box, Card, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import localVideo from "../assets/how-work-it.mp4";

const videoAds = [
    {
        id: 1,
        src: localVideo,
        type: "local",
    },
    {
        id: 2,
        src: "//40e507dd0272b7bb46d376a326e6cb3c.cdn.bubble.io/f1742105399665x244292551448723300/nPx5IeLK49MFZ7KiCZr9j_output.mp4",
        type: "remote",
    },
];

const AdClipModal = () => {
    const [showAds, setShowAds] = useState(false);

    useEffect(() => {
        setShowAds(true);
        const interval = setInterval(() => {
            setShowAds(true);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleCloseAds = () => setShowAds(false);

    return (
        <Modal open={showAds} onClose={handleCloseAds}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "rgba(0,0,0,0.6)", p: 4, }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, position: "relative", boxShadow: 6, maxWidth: 800, width: "100%", }}>
                    <IconButton onClick={handleCloseAds} sx={{ position: "absolute", top: 8, right: 8, color: "black", zIndex: 10, }}>
                        <CloseIcon />
                    </IconButton>

                    {videoAds.map((ad) => (
                        <Card key={ad.id} sx={{ overflow: "hidden", boxShadow: 3, height: 500, }}>
                            <video preload="metadata" autoPlay muted loop width="100%" height="auto" style={{ display: "block" }}>
                                <source src={ad.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default AdClipModal;
