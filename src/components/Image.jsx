import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import React from "react";
import { IoMdDownload } from "react-icons/io";

import "../styles/image.css";

const Image = ({
  containerRef,
  containerClass,
  imageClass,
  imageStyle,
  cldImage,
  isAdvancedImage,
  children,
  handleDownload,
}) => {
  return (
    <div ref={containerRef} className={containerClass}>
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
        <div className="imageDetails">
          {children}
          <button className="downloadButton" onClick={handleDownload}>
            <IoMdDownload className="downloadIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
