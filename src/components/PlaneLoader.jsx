import React, { useMemo } from "react";
import { FaPlane } from "react-icons/fa";

import "../styles/planeLoader.css";
const PlaneLoader = () => {
  const dots = useMemo(() => {
    const dots = [];
    for (let i = 1; i <= 20; i++) {
      dots.push(<span key={i} style={{ "--i": i }} className="dot" />);
    }
    return dots;
  }, []);

  return (
    <div className="loader">
      {dots}
      <div className="planeContainer">
        <FaPlane className="planeIcon" />
      </div>
    </div>
  );
};

export default PlaneLoader;
