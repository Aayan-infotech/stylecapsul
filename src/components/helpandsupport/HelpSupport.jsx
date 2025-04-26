import React from "react";
import "../../styles/HelpSupport.scss";

const HelpSupport = () => {
  const helpandsupport = [
    {
      id: "collapseOne",
      title: "How do I book a stylist appointment?",
      content:
        "To book a stylist, go to the 'Stylist' section, choose your preferred expert, select an available date and time slot, then confirm your booking. You'll receive a confirmation notification once it's scheduled.",
    },
    {
      id: "collapseTwo",
      title: "What is the Closet Management feature?",
      content:
        "The Closet Management feature helps you organize and digitize your wardrobe. You can upload images of your clothes, categorize them by type, color, season, and easily plan outfits for any occasion.",
    },
    {
      id: "collapseThree",
      title: "Can I share my wardrobe with my stylist?",
      content:
        "Yes! You can grant your stylist access to your digital closet. This allows them to better understand your style and make personalized recommendations or outfit plans based on what you already own.",
    },
    {
      id: "collapseFour",
      title: "How does outfit planning work?",
      content:
        "Our app allows you to mix and match your wardrobe items to create complete outfits. You can save outfit combinations for future use, plan outfits for upcoming events, and get suggestions from your stylist.",
    },
    {
      id: "collapseFive",
      title: "Is there a way to track worn outfits?",
      content:
        "Yes, the app keeps a history of your worn outfits so you can avoid outfit repeats and rotate your wardrobe effectively. Great for managing fashion variety without effort!",
    },
  ];

  const generateItemId = (index) => `collapse${index + 1}`;

  return (
    <div className="help-support-container">
      <div className="container w-75">
        <div className="row m-0 mt-4">
          <div className="col-12">
            <div className="accordion" id="accordionExample">
              {helpandsupport.map((item) => (
                <div key={item.id} className="col-12 mt-3">
                  <div className="p-3 rounded" style={{ backgroundColor: "#EAEAEA", borderLeft: "4px solid #0d6efd", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)", }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fw-bold fs-5">{item.title}</h4>
                      <div className="help-arrow-up">
                        <i className="fa-solid fa-angle-up"></i>
                      </div>
                    </div>
                    <p className="help-content">{item.content}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
