import { AdvancedImage } from "@cloudinary/react";
import React, { useEffect, useRef } from "react";
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
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const onLeftArrowClick = () => {
    if (!prevButtonRef) return;
    prevButtonRef.current.classList.add("simulatePreviousButtonActive");
    prevButtonRef.current.click();

    setTimeout(() => {
      prevButtonRef.current.classList.remove("simulatePreviousButtonActive");
    }, 100);
  };

  const onRightArrowClick = () => {
    if (!nextButtonRef) return;
    nextButtonRef.current.classList.add("simulateNextButtonActive");
    nextButtonRef.current.click();

    setTimeout(() => {
      nextButtonRef.current.classList.remove("simulateNextButtonActive");
    }, 100);
  };

  const onExitClick = () => {
    if (!closeButtonRef) return;
    closeButtonRef.current.classList.add("simulateCloseButtonActive");

    setTimeout(() => {
      closeButtonRef.current.classList.remove("simulateCloseButtonActive");
      closeButtonRef.current.click();
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          onLeftArrowClick();
          break;
        case "ArrowRight":
          onRightArrowClick();
          break;
        case "Escape":
          onExitClick();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="slider">
      <SliderButton
        icon={<GrClose />}
        handleClick={handleClose}
        className="sliderCloseButton"
        buttonRef={closeButtonRef}
      />
      <SliderButton
        icon={<GrLinkPrevious />}
        handleClick={onPreviousImgClick}
        className="sliderPreviousButton"
        buttonRef={prevButtonRef}
      />
      <SliderButton
        icon={<GrLinkNext />}
        handleClick={onNextImgClick}
        className="sliderNextButton"
        buttonRef={nextButtonRef}
      />
      <AdvancedImage className="sliderImage" cldImg={cldImage} />
    </div>
  );
};

export default Slider;
