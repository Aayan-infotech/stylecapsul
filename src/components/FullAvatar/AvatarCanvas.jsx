import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import scenes from "../../assets/defalutAvatar/source/base-avatar.glb";
import "../FullAvatar/AvatarGenerator.scss";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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

const AvatarCanvas = ({ shirtTexture, jeansTexture, shoeTexture }) => {
  const [scale, setScale] = useState(1);

  const handleIncrease = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleDecrease = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleDecrease} type="button" class="btn btn-dark"><RemoveIcon/></button>
        <span style={{ margin: "0 10px" }}>Scale: {scale.toFixed(1)}</span>
        <button onClick={handleIncrease} type="button" class="btn btn-dark"><AddIcon/></button>
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
