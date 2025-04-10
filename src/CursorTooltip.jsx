// CursorTooltip.jsx
import React, { useEffect, useState } from "react";

const CursorTooltip = ({ text = "Name" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ top: position.y + 15, left: position.x + 15 }}
    >
      {text} 
    </div>
  );
};

export default CursorTooltip;
