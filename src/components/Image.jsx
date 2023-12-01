import { AdvancedImage, placeholder } from "@cloudinary/react";
import { IoMdDownload } from "react-icons/io";

import "../styles/image.css";
import React, { memo } from "react";

const Image = ({
  containerRef,
  containerClass,
  imageClass,
  imageStyle,
  cldImage,
  children,
  handleDownload,
  onImageClick,
  imgSrc,
  imgAlt,
}) => {
  return (
    <div ref={containerRef} className={containerClass} onClick={onImageClick}>
      <div className="imageAndDetailsContainer">
        {cldImage ? (
          <AdvancedImage
            className={imageClass}
            style={imageStyle}
            cldImg={cldImage}
            plugins={[placeholder({ mode: "blur" })]}
          />
        ) : (
          <img src={imgSrc} alt={imgAlt} className={imageClass} />
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
