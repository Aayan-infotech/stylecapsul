import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";

const Chat = () => {
  const db = getFirestore();
  const location = useLocation();
  const st_chat = location?.state?.profile_details;
  console.log(st_chat, 'st_chat');

  const userId = getCookie("userId");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(st_chat ? {
    _id: st_chat._id,
    name: st_chat.name || st_chat.receiverName,
    ...st_chat
  } : null);

  const { user, status } = useSelector((state) => state.login);
  const singleUser = user?.payload || user;

  const [chatList, setChatList] = useState([]);
  const chatBodyRef = useRef(null);

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

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // const handleSendMessage = async () => {
  //   if (!message.trim() || !selectedStylist || !selectedStylist._id) return;
  //   const senderId = userId;
  //   const receiverId = selectedStylist._id;
  //   const chatId = getChatId(senderId, receiverId);
  //   const time = Date.now();

  //   const receiverName = selectedStylist.name || selectedStylist.receiverName || "Unknown";

  //   const chat = {
  //     msg: message,
  //     timeStamp: time,
  //     type: "text",
  //     receiverId: receiverId,
  //     receiverName: receiverName,
  //     senderId: senderId,
  //     senderName: singleUser?.firstName,
  //     profileImage: singleUser?.profileImage
  //   };
  //   const users = {
  //     receiverId: receiverId,
  //     senderId: senderId,
  //     receiverName: receiverName,
  //     senderName: singleUser?.firstName,
  //     lastMessage: message,
  //     lastMessageTime: time,
  //     profileImage: singleUser?.profileImage
  //   };
  //   setMessage("");
  //   try {
  //     const messageRef = collection(db, "chats", chatId, "messages");
  //     await addDoc(messageRef, chat);
  //     await setDoc(
  //       doc(db, "chat_list", senderId, "messages", receiverId),
  //       users
  //     );
  //     await setDoc(
  //       doc(db, "chat_list", receiverId, "messages", senderId),
  //       users
  //     );
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedStylist || !selectedStylist._id) return;
    const senderId = userId;
    const receiverId = selectedStylist._id;
    const chatId = getChatId(senderId, receiverId);
    const time = Date.now();
    const receiverName = selectedStylist.name || selectedStylist.receiverName || "Unknown";
    const chat = {
      msg: message,
      timeStamp: time,
      type: "text",
      receiverId: receiverId,
      receiverName: receiverName,
      senderId: senderId,
      senderName: singleUser?.firstName,
      profileImage: singleUser?.profileImage,
    };
    setMessage("");
    try {
      const messageRef = collection(db, "chats", chatId, "messages");
      await addDoc(messageRef, chat);
      await setDoc(
        doc(db, "chat_list", senderId, "messages", receiverId),
        {
          receiverId,
          senderId,
          receiverName,
          senderName: singleUser?.firstName,
          lastMessage: message,
          lastMessageTime: time,
          profileImage: selectedStylist?.profilePicture || "",
        }
      );
      await setDoc(
        doc(db, "chat_list", receiverId, "messages", senderId),
        {
          receiverId: senderId,
          senderId: receiverId,
          receiverName: singleUser?.firstName,
          senderName: receiverName,
          lastMessage: message,
          lastMessageTime: time,
          profileImage: singleUser?.profileImage || "",
        }
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
            {/* <div className="search-bar mb-3">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" className="search-input" placeholder="Search Message" />
            </div> */}
            <div className="overflow-list">
              {chatList.map((stylist) => (
                <div
                  key={stylist.stylistId}
                  className={`mt-2 show-list ${selectedStylist?._id === stylist.stylistId ? "active" : ""}`}
                  onClick={() => setSelectedStylist({ _id: stylist.stylistId, ...stylist })}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={stylist?.stylistProfileImage || blank_image}
                      alt={stylist.name}
                      className="profile-image rounded-circle"
                      onError={(e) => { e.target.onerror = null; e.target.src = blank_image }}
                    />
                    <div className="message-content ms-3">
                      <h4 className="name fs-5 mb-1">{stylist?.receiverName}</h4>
                      <p className="mb-0">{new Date(stylist?.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
              <div className="chat-body p-3" ref={chatBodyRef} style={{ overflowY: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
                {messages?.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      maxWidth: '70%',
                      marginBottom: '10px',
                      alignSelf: msg.senderId === userId ? 'flex-end' : 'flex-start',
                      backgroundColor: msg.senderId === userId ? '#DCF8C6' : '#F1F0F0',
                      padding: '10px 15px',
                      borderRadius: '20px',
                      borderTopRightRadius: msg.senderId === userId ? '0' : '20px',
                      borderTopLeftRadius: msg.senderId === userId ? '20px' : '0',
                    }}
                  >
                    <div>{msg.msg}</div>
                    <p className="mb-0 mt-1" style={{ fontSize: '0.75rem', color: '#888' }}>
                      {new Date(msg?.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>

              <div className="chat-footer d-flex align-items-center p-3">
                <div className="search-bar rounded-pill me-3">
                  <input type="text" className="search-input" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} />
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
