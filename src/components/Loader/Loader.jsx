// src/components/Loader/Loader.jsx
import React from "react";
import "../../styles/Loader.scss";

const Loader = () => {
  return (
    <div className="spinner">
      <div className="spinner__item pill">
        <div className="pill__item">
          <div className="pill__half"></div>
        </div>
        <div className="pill__shadow"></div>
      </div>
    </div>
  );
};

export default Loader;
