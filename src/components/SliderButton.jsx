import React from "react";
import "../styles/sliderButton.css";

const SliderButton = ({ icon, handleClick, className, buttonRef }) => {
  return (
    <button
      ref={buttonRef}
      className={`sliderButton ${className}`}
      onClick={handleClick}
    >
      {icon && React.cloneElement(icon, { className: "sliderButtonIcon" })}
    </button>
  );
};
export default SliderButton;
