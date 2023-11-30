import { AdvancedImage } from "@cloudinary/react";
import React from "react";
import "../styles/slider.css";
import { GrLinkPrevious, GrLinkNext, GrClose } from "react-icons/gr";
import SliderButton from "./SliderButton";

const Slider = ({
  cldImage,
  handleClose,
  handlePrevious,
  handleNext,
  onNextImgClick,
  onPreviousImgClick,
}) => {
  return (
    <div className="slider">
      <SliderButton
        icon={<GrClose />}
        handleClick={handleClose}
        className="sliderCloseButton"
      />
      <SliderButton
        icon={<GrLinkPrevious />}
        handleClick={onPreviousImgClick}
        className="sliderPreviousButton"
      />
      <SliderButton
        icon={<GrLinkNext />}
        handleClick={onNextImgClick}
        className="sliderNextButton"
      />
      <AdvancedImage
        className="sliderImage"
        cldImg={cldImage}
        // plugins={[placeholder({ mode: "blur" })]}
      />
    </div>
  );
};

export default Slider;
