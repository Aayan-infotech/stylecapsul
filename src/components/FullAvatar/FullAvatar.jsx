import React, { useEffect, useRef, useState } from "react";
import "./FullAvatar.scss";
import { Link } from "react-router-dom";
import girls from "./img/one.png";
import stage from "./img/one1.png";
import two from "./img/two.png";
import three from "./img/three.png";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import avatarmodel from '../../assets/source/PunkStyleAvatarHellen.glb'
import shirt from '../../assets/textures/shirt11.webp'
import jeans from '../../assets/textures/Shoes_BaseColor_11.jpeg'
import shoes from '../../assets/textures/redjeans.jfif'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function FullAvatar() {
  const [imagePreview, setImagePreview] = useState(null);
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);
    const loader = new GLTFLoader();
    loader.load(avatarmodel, (gltf) => {
      const avatar = gltf.scene;
      avatar.scale.set(1.5, 1.5, 1.5);
      scene.add(avatar);

      setScene({ scene, renderer, camera, avatar });
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false; 
      controls.maxPolarAngle = Math.PI / 2;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleClothingChange = (clothingType, imageUrl) => {
    if (!scene) return;
    const { scene: currentScene, avatar } = scene;
    const loader = new THREE.TextureLoader();
    
    const clothingParts = {
      shirt: shirt,
      jeans: jeans,
      shoes: shoes 
    };
  
    // Update the texture based on the clothing type
    avatar.traverse((child) => {
      if (child.name === clothingParts[clothingType]) {
        loader.load(imageUrl, (texture) => {
          child.material.map = texture;
          child.material.needsUpdate = true;
        });
      }
    });
  };

  const handleImageUpload = (event, clothingType) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      handleClothingChange(clothingType, previewUrl);
    }
  };

  return (
    <>
      <div className="capsule-main-container">
        <div className="container w-75">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="position-relative">
                <img src={stage} className="stage-img" alt="Stage" />
                <img src={girls} className="overlay-img" alt="Girls" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row g-2">
                <div className="col-12">
                  <div className="p-2">
                    <Link to="/body">
                      <button
                        type="button"
                        className="btn rounded-pill text-white fw-bold"
                        style={{ width: "200px", backgroundColor: "black" }}
                      >
                        <img src={two} alt="" className="me-3" />
                        Edit Avatar
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-2">
                    <button
                      type="button"
                      className="btn rounded-pill p-3 text-white fw-bold"
                      style={{ width: "200px", backgroundColor: "black" }}
                    >
                      <img src={three} alt="" height={25} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div ref={mountRef}></div>
          <div>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "shirt")} />
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "jeans")} />
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "shoes")} />
          </div>
          {imagePreview && <img src={imagePreview} alt="Preview" />}
        </div>
      </div>
    </>
  );
}

export default FullAvatar;
