import React, { useEffect, useState } from "react";
import "../../styles/Chat.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { useLocation } from "react-router-dom";

import { db } from "../../firebase";
import { getCookie } from '../../utils/cookieUtils';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const Chat = () => {
  const location = useLocation();
  const stylistList = location?.state?.profile_details;
  const st_chat = location?.state?.stylistList;

  const userId = getCookie("userId");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(st_chat);

  useEffect(() => {
    if (!selectedStylist || !selectedStylist._id) return;
    const stylistId = selectedStylist._id;
    const chatId = userId < stylistId ? `${userId}_${stylistId}` : `${stylistId}_${userId}`;
    console.log("Fetching messages for chatId:", chatId);

    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Messages fetched:", fetchedMessages); 
      setMessages(fetchedMessages);
    });
  
    return () => unsubscribe();
  }, [selectedStylist]);
  

  const handleSendMessage = async () => {
    console.log(selectedStylist, 'selectedStylist')
    if (!message.trim() || !selectedStylist || !selectedStylist._id) return;

    const stylistId = selectedStylist._id;
    const chatId = userId < stylistId ? `${userId}_${stylistId}` : `${stylistId}_${userId}`;

    try {
      const docRef = await addDoc(
        collection(db, "chats", selectedStylist._id, "messages"),
        {
          text: message,
          sender: userId,
          timestamp: serverTimestamp(),
        }
      );
      console.log("Message Sent Successfully:", docRef._id);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStylistClick = (stylist) => {
    if (!stylist) return;
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
              <div
                className={`mt-2 show-list ${
                  stylistList?.id === stylistList?.id ? "active" : ""
                }`}
                onClick={() => handleStylistClick(stylistList)}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={stylistList?.profilePicture || blank_image}
                    alt={stylistList?.name || "Stylist"}
                    className="profile-image rounded-circle"
                  />
                  <div className="message-content ms-3">
                    <h4 className="name fs-5 mb-1">{stylistList?.name}</h4>
                    <p className="message mb-0 text-muted">
                      {stylistList?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {selectedStylist && (
            <div className="col-12 col-md-8 chat-page">
              <div className="d-flex align-items-center justify-content-between p-3">
                <h2 className="fs-4 m-0">{selectedStylist.name}</h2>
              </div>
              <div className="chat-body p-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-bubble ${
                      msg.sender === "user" ? "right-bubble" : "left-bubble"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* 🔹 Message Input */}
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
                  <button
                    onClick={handleSendMessage}
                    type="button"
                    className="btn btn-dark rounded-pill"
                  >
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
