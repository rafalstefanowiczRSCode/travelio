import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { IoMdDownload } from "react-icons/io";

import "../styles/image.css";
import React, { memo } from "react";

const Image = ({
  containerRef,
  containerClass,
  imageClass,
  imageStyle,
  cldImage,
  isAdvancedImage,
  children,
  handleDownload,
  onImageClick,
}) => {
  return (
    <div ref={containerRef} className={containerClass} onClick={onImageClick}>
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

const isEqual = (prevProps, nextProps) => {
  return prevProps.containerRef === nextProps.containerRef;
};
export const memoImage = memo(Image, isEqual);
