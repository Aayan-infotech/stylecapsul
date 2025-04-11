import React, { useEffect, useState } from "react";
import "../../styles/Chat.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  query,
  orderBy,
  getFirestore
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { getCookie } from "../../utils/cookieUtils";

const Chat = () => {
  const db = getFirestore();
  const location = useLocation();
  const st_chat = location?.state?.profile_details;

  const userId = getCookie("userId");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(st_chat);
  const [chatList, setChatList] = useState([]);

  const getChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_chat_${uid2}` : `${uid2}_chat_${uid1}`;
  };

  useEffect(() => {
    if (!userId) return;
    const chatListRef = collection(db, `chat_list`, userId, `messages`);
    const unsubscribe = onSnapshot(chatListRef, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({
        stylistId: doc.id,
        ...doc.data(),
      }));
      setChatList(chats);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!selectedStylist || !selectedStylist._id) return;
    const chatId = getChatId(userId, selectedStylist._id);
    const messagesRef = collection(db, `chats`, chatId, `messages`);
    console.log(messagesRef, 'messagesRef')
    const q = query(messagesRef, orderBy("timeStamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [selectedStylist, userId]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedStylist || !selectedStylist._id) return;
    const senderId = userId;
    const receiverId = selectedStylist._id;
    const chatId = getChatId(senderId, receiverId);
    const time = Date.now();
    const chat = {
      msg: message,
      timeStamp: time,
      type: "text",
      receiverId: receiverId,
      receiverName: selectedStylist.name,
      senderId: senderId,
      senderName: "dev",
    };
    const users = {
      receiverId: receiverId,
      senderId: senderId,
      receiverName: selectedStylist.name,
      senderName: "dev",
      lastMessage: message,
      lastMessageTime: time,
    };
    setMessage("");
    try {
      const messageRef = collection(db, "chats", chatId, "messages");
      await addDoc(messageRef, chat);
      await setDoc(
        doc(db, "chat_list", senderId, "messages", receiverId),
        users
      );
      await setDoc(
        doc(db, "chat_list", receiverId, "messages", senderId),
        users
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="stylist-message-container">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row gx-0">
          <div className="col-12 col-md-4 chat-list">
            <div className="search-bar mb-3">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" className="search-input" placeholder="Search Message" />
            </div>
            <div className="overflow-list">
              {chatList.map((stylist) => (
                <div
                  key={stylist.stylistId}
                  className={`mt-2 show-list ${selectedStylist?._id === stylist.stylistId ? "active" : ""}`}
                  onClick={() => setSelectedStylist({ _id: stylist.stylistId, ...stylist })}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={stylist.profilePicture || blank_image}
                      alt={stylist.name}
                      className="profile-image rounded-circle"
                      onError={(e) => { e.target.onerror = null; e.target.src = blank_image }}
                    />
                    <div className="message-content ms-3">
                      <h4 className="name fs-5 mb-1">{stylist.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedStylist && (
            <div className="col-12 col-md-8 chat-page">
              <div className="d-flex align-items-center justify-content-between p-3">
                <h2 className="fs-4 m-0">{selectedStylist.name}</h2>
              </div>
              <div className="chat-body p-3">
                {messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-bubble ${msg.sender === userId ? "right-bubble" : "left-bubble"}`}
                  >
                    {msg.msg}
                  </div>
                ))}
              </div>
              <div className="chat-footer d-flex align-items-center p-3">
                <div className="search-bar rounded-pill me-3">
                  <i className="fa-solid fa-paperclip search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <i className="fa-regular fa-face-smile search-icon"></i>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="btn btn-dark rounded-pill"
                >
                  <i className="fa-solid fa-paper-plane send-icon"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
