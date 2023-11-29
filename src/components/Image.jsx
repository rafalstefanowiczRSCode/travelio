import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import React from "react";

import "../styles/image.css";

const Image = ({
  containerRef,
  containerClass,
  imageClass,
  imageStyle,
  cldImage,
  isAdvancedImage,
}) => {
  return (
    <button ref={containerRef} className={containerClass}>
      <div className="imageAndDetailsContainer">
        {isAdvancedImage ? (
          <AdvancedImage
            className={imageClass}
            style={imageStyle}
            cldImg={cldImage}
            plugins={[placeholder({ mode: "blur" })]}
          />
        ) : (
          <img></img>
        )}
        <div className="imageDetails"></div>
      </div>
    </button>
  );
};

export default Image;
