import React, { useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import scenes from "../../assets/defalutAvatar/source/base-avatar.glb";
import "../FullAvatar/AvatarGenerator.scss";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import { showSuccessToast } from "../toastMessage/Toast";

const Avatar = ({ shirtTexture, jeansTexture, shoeTexture, scale }) => {
  const { scene } = useGLTF(scenes);
  const loader = new THREE.TextureLoader();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "Wolf3D_Outfit_Top" && shirtTexture) {
          loader.load(shirtTexture, (texture) => {
            child.material.map = texture;
            child.material.needsUpdate = true;
            applyTexture(child, shirtTexture);
          });
        }
        if (child.name === "Wolf3D_Outfit_Bottom" && jeansTexture) {
          loader.load(jeansTexture, (texture) => {
            child.material.map = texture;
            child.material.needsUpdate = true;
            applyTexture(child, jeansTexture);
          });
        }
        if (child.name === "Wolf3D_Outfit_Footwear" && shoeTexture) {
          loader.load(shoeTexture, (texture) => {
            child.material.map = texture;
            child.material.needsUpdate = true;
            applyTexture(child, shoeTexture);
          });
        }
      }
    });
  }, [scene, shirtTexture, jeansTexture, shoeTexture]);

  return <primitive object={scene} scale={scale} dispose={null} />;
};

const applyTexture = (mesh, textureURL) => {
  const loader = new THREE.TextureLoader();
  loader.load(textureURL, (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    mesh.material.map = texture;
    mesh.material.needsUpdate = true;
  });
};

// Helper component to use WebGLRenderer for capturing the scene
const CaptureScene = ({ onCapture }) => {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    if (onCapture) {
      const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(1024, 1024);
      renderer.render(scene, camera);
      const imgData = renderer.domElement.toDataURL("image/png");
      handleSubmitAvatar(imgData);
      onCapture(imgData);
      renderer.dispose();
    }
  }, [onCapture, gl, scene, camera]);

  return null;
};

const base64ToBlob = (base64Data, contentType = "image/png") => {
  const byteCharacters = atob(base64Data.split(",")[1]); // Decode Base64 string
  const byteNumbers = Array.from(byteCharacters).map((char) =>
    char.charCodeAt(0)
  );
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};


const handleSubmitAvatar = async (imgData) => {
  if (!imgData) {
    showErrorToast("Please capture the avatar image first.");
    return;
  }
  try {
    const token = getCookie("authToken");
    const userId = getCookie("userId");
    const blob = base64ToBlob(imgData);
    const formData = new FormData();
    formData.append("image", blob, "profileImage.png");
    console.log(formData, 'formData')
    const response = await axios.post(
      apiUrl(`api/user/profile/${userId}`),
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response?.data?.success === true && response?.data?.status === 200) {
      showSuccessToast(response?.data?.message);
    }
  } catch (error) {
    console.error("Error uploading avatar image:", error);
  }
};

const AvatarCanvas = ({ shirtTexture, jeansTexture, shoeTexture }) => {
  const [scale, setScale] = useState(1);
  const [capture, setCapture] = useState(null);

  const handleIncrease = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.8));
  };

  const handleDecrease = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleCaptureImage = () => {
    setCapture(() => (imgData) => {
      const a = document.createElement("a");
      a.href = imgData;
      a.download = "avatar.png";
      a.click();
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="mt-4 mb-4">
        <button
          onClick={handleCaptureImage}
          type="button"
          className="btn btn-success small me-3"
        >
          Capture
        </button>
        <button
          onClick={handleDecrease}
          type="button"
          className="btn btn-dark small"
        >
          <RemoveIcon />
        </button>
        <span style={{ margin: "0 10px" }} className="fw-bold">
          Scale: {scale.toFixed(1)}
        </span>
        <button
          onClick={handleIncrease}
          type="button"
          className="btn btn-dark small"
        >
          <AddIcon />
        </button>
      </div>
      <Canvas
        camera={{ position: [0, 2, 5] }}
        style={{ height: "500px", marginTop: "0" }}
      >
        <ambientLight intensity={1.5} />
        <OrbitControls />
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
          <meshStandardMaterial color="#c2c2c2" />
        </mesh>
        <Avatar
          shirtTexture={shirtTexture}
          jeansTexture={jeansTexture}
          shoeTexture={shoeTexture}
          scale={[scale, scale, scale]}
        />
        {capture && <CaptureScene onCapture={capture} />}
      </Canvas>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default AvatarCanvas;
