import { AdvancedImage } from "@cloudinary/react";
import React from "react";
import "../styles/slider.css";

const Slider = ({ cldImage }) => {
  return (
    <div className="slider">
      <AdvancedImage
        className="sliderImage"
        style={{ height: "100%" }}
        cldImg={cldImage}
        // plugins={[placeholder({ mode: "blur" })]}
      />
    </div>
  );
};

export default Slider;
