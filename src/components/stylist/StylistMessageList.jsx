import React, { useState } from "react";
import "../../styles/StylistMessageList.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import image_1 from "../../assets/marketplace/showimg5.jpg";

const StylistMessageList = () => {
  const [selectedStylist, setSelectedStylist] = useState(null);

  const listdata = [
    {
      id: "1",
      imgurl: image_1,
      name: "John Doe",
      description: "hey this side is Jhon, I hope you are doing well",
    },
    {
      id: "2",
      imgurl: image_1,
      name: "Emma",
      description: "hey emma this side, i hope you're doing well.",
    },
    {
      id: "3",
      imgurl: image_1,
      name: "Jimmy",
      description: "hey jimmy this side, i hope you're doing well.",
    },
    {
        id: "2",
        imgurl: image_1,
        name: "Emma",
        description: "hey emma this side, i hope you're doing well.",
      },
      {
        id: "3",
        imgurl: image_1,
        name: "Jimmy",
        description: "hey jimmy this side, i hope you're doing well.",
      },
      {
        id: "2",
        imgurl: image_1,
        name: "Emma",
        description: "hey emma this side, i hope you're doing well.",
      },
      {
        id: "3",
        imgurl: image_1,
        name: "Jimmy",
        description: "hey jimmy this side, i hope you're doing well.",
      },
  ];

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
            {listdata.map((item) => (
              <div className={`mt-2 show-list ${
                  selectedStylist?.id === item.id ? "active" : ""}`} key={item.id} onClick={() => handleStylistClick(item)}>
                <div className="d-flex align-items-center">
                  <img
                    src={item.imgurl || blank_image}
                    alt={item.name || "Stylist"}
                    className="profile-image rounded-circle"
                  />
                  <div className="message-content ms-3">
                    <h4 className="name fs-5 mb-1">{item.name}</h4>
                    <p className="message mb-0 text-muted">
                      {item.description}
                    </p>
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
                <div className="message-bubble left-bubble">
                  {selectedStylist.description}
                </div>
                <div className="message-bubble right-bubble">
                  Hey, thank you so much, I'll let you know when I need any
                  help.
                </div>
              </div>
              <div className="chat-footer d-flex align-items-center p-3">
                <div className="search-bar rounded-pill me-3">
                  <i class="fa-solid fa-paperclip search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                  />
                  <i class="fa-regular fa-face-smile search-icon"></i>
                </div>
                <div className="send-button d-flex justify-content-center align-items-center">
                  <button type="button" class="btn btn-dark rounded-pill">
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

export default StylistMessageList;
