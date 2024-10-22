import React, { useEffect, useState } from "react";
import "../../styles/Chat.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import image_1 from "../../assets/marketplace/showimg5.jpg";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";

const Chat = () => {
    const location = useLocation();
    const st_chat = location?.state?.stylistList;

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState(""); // message input
    const [messages, setMessages] = useState([]); // list of all messages
    const [selectedStylist, setSelectedStylist] = useState(st_chat);

    useEffect(() => {
        // Connect to the socket server
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        // Handle receiving messages from server
        newSocket.on("receive-message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            newSocket.disconnect(); // Cleanup connection when the component unmounts
        };
    }, []);

    // Handle sending a message
    const handleSendMessage = () => {
        if (message.trim() && socket) {
            const newMessage = {
                content: message,
                sender: "user", // or stylist, depending on who is sending
                timestamp: new Date(),
            };

            // Emit the message to the server
            socket.emit("send-message", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Append message to chat
            setMessage(""); // Clear input field
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };


    const handleStylistClick = (stylist) => {
        setSelectedStylist(stylist);
    };

    return (
        <div className="stylist-message-container">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row gx-0">
                    <div className="col-12 col-md-4 chat-list">
                        <div className="search-bar mb-3">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search Message"
                            />
                        </div>
                        <div className="overflow-list">
                            <div className={`mt-2 show-list ${st_chat?.id === st_chat?.id ? "active" : ""}`} onClick={() => handleStylistClick(st_chat)}>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={st_chat?.profilePicture || blank_image}
                                        alt={st_chat?.name || "Stylist"}
                                        className="profile-image rounded-circle"
                                    />
                                    <div className="message-content ms-3">
                                        <h4 className="name fs-5 mb-1">{st_chat?.name}</h4>
                                        <p className="message mb-0 text-muted">
                                            {st_chat?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {st_chat && (
                        <div className="col-12 col-md-8 chat-page">
                            <div className="d-flex align-items-center justify-content-between p-3">
                                <h2 className="fs-4 m-0">{st_chat.name}</h2>
                            </div>
                            <div className="chat-body p-3">
                                <div className="message-bubble left-bubble">
                                    {st_chat.description}
                                </div>
                                <div className="message-bubble right-bubble">
                                    Hey, thank you so much, I'll let you know when I need any
                                    help.
                                </div>
                            </div>
                            <div className="chat-footer d-flex align-items-center p-3">
                                <div className="search-bar rounded-pill me-3">
                                    <i className="fa-solid fa-paperclip search-icon"></i>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Type a message..."
                                        value={message}
                                        onChange={handleInputChange}
                                    />
                                    <i className="fa-regular fa-face-smile search-icon"></i>
                                </div>
                                <div className="send-button d-flex justify-content-center align-items-center">
                                    <button onClick={handleSendMessage} type="button" className="btn btn-dark rounded-pill">
                                        <i className="fa-solid fa-paper-plane send-icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;