import React, { useState } from "react";

function AvatarGenerator({ avatarOptions, onSave }) {
  const [currentOptions, setCurrentOptions] = useState(avatarOptions);

  const handleOptionChange = (part, value) => {
    setCurrentOptions({
      ...currentOptions,
      [part]: value,
    });
  };

  const handleSave = () => {
    onSave(currentOptions);
  };

  return (
    <div className="avatar-generator">
      <h3>Customize Your Avatar</h3>
      <label>Head</label>
      <select
        value={currentOptions.head}
        onChange={(e) => handleOptionChange("head", e.target.value)}
      >
        <option value="defaultHead">Default</option>
        <option value="shortHair">Short Hair</option>
        <option value="longHair">Long Hair</option>
        {/* Add more head types */}
      </select>

      {/* Torso Customization */}
      <label>Torso</label>
      <select
        value={currentOptions.torso}
        onChange={(e) => handleOptionChange("torso", e.target.value)}
      >
        <option value="defaultTorso">Default</option>
        <option value="shirt">Shirt</option>
        <option value="hoodie">Hoodie</option>
        {/* Add more torso types */}
      </select>

      {/* Arms Customization */}
      <label>Arms</label>
      <select
        value={currentOptions.arms}
        onChange={(e) => handleOptionChange("arms", e.target.value)}
      >
        <option value="defaultArms">Default</option>
        <option value="muscular">Muscular</option>
        <option value="slim">Slim</option>
        {/* Add more arm types */}
      </select>

      {/* Legs Customization */}
      <label>Legs</label>
      <select
        value={currentOptions.legs}
        onChange={(e) => handleOptionChange("legs", e.target.value)}
      >
        <option value="defaultLegs">Default</option>
        <option value="jeans">Jeans</option>
        <option value="shorts">Shorts</option>
        {/* Add more leg types */}
      </select>

      {/* Skin Color Customization */}
      <label>Skin Color</label>
      <input
        type="color"
        value={currentOptions.skinColor}
        onChange={(e) => handleOptionChange("skinColor", e.target.value)}
      />

      {/* Save Button */}
      <button onClick={handleSave}>Save Avatar</button>
    </div>
  );
}

export default AvatarGenerator;
