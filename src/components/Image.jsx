import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import React from "react";

const Image = ({
  containerRef,
  containerClass,
  imageClass,
  imageStyle,
  cldImage,
  isAdvancedImage,
}) => {
  return (
    <div ref={containerRef} className={containerClass}>
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
    </div>
  );
};

export default Image;
