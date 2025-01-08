import React, { useState } from "react";
import "./FullAvatar.scss";
import three from "./img/three.png";
import AvatarCanvas from "./AvatarCanvas";
import { Link, useNavigate } from "react-router-dom";

function FullAvatar() {
  const [shirtTexture, setShirtTexture] = useState(null);
  const [jeansTexture, setJeansTexture] = useState(null);
  const [shoeTexture, setShoeTexture] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event, setTexture) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTexture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="capsule-main-container">
        <div className="container text-center">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <AvatarCanvas
                shirtTexture={shirtTexture}
                jeansTexture={jeansTexture}
                shoeTexture={shoeTexture}
                onCapture={setCapturedImage}
              />
            </div>
            {capturedImage && (
              <div className="mt-3">
                <h5>Captured Avatar Preview:</h5>
                <img
                  src={capturedImage}
                  alt="Captured Avatar"
                  style={{ width: "100%" }}
                />
              </div>
            )}
            <div className="col-12 col-md-6 d-flex align-items-center">
              <div className="text-start">
                <div className="mb-2">
                  <span className="me-4">Shirt</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setShirtTexture)}
                  />
                </div>
                <div className="mb-2">
                  <span className="me-4">Jeans</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setJeansTexture)}
                  />
                </div>
                <div className="mb-2">
                  <span className="me-4">Shoes</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setShoeTexture)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullAvatar;
