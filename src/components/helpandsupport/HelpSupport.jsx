import React, { useState } from "react";
import "../../styles/HelpSupport.scss";

const HelpSupport = () => {
  const helpandsupport = [
    {
      id: "collapseOne",
      title: "What is an expansion panel 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "collapseTwo",
      title: "What is an expansion panel? 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "collapseThree",
      title: "What is an expansion panel? 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  const generateItemId = (index) => `collapse${index + 1}`;

  return (
    <div className="help-support-container">
      <div className="container w-75">
        <div className="row mt-4 mx-0">
          <h1 className="fw-bold fs-1">Help & Support</h1>
          <div className="col-12 mt-2">
            <div className="p-3 rounded" style={{ backgroundColor: "#EAEAEA" }}>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fw-bold fs-5">What is xyz ?</h4>
                <div className="help-arrow-up">
                  <i className="fa-solid fa-angle-up"></i>
                </div>
              </div>
              <p className="help-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                euismod bibendum laoreet. Proin gravida dolor sit ame
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="accordion" id="accordionExample">
              {helpandsupport.map((item, index) => {
                const itemId = generateItemId(index);

                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <h2
                        className="accordion-button text-black fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${itemId}`}
                        aria-expanded={index === 0}
                        aria-controls={itemId}
                      >
                        {item.title}
                      </h2>
                    </h2>
                    <div
                      id={itemId}
                      className={`accordion-collapse collapse ${
                        index === 0 ? "show" : ""
                      }`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
