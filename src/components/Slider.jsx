import { AdvancedImage, placeholder } from "@cloudinary/react";
import React, { useEffect, useRef } from "react";
import "../styles/slider.css";
import { GrLinkPrevious, GrLinkNext, GrClose } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";
import SliderButton from "./SliderButton";

const Slider = ({
  cldImage,
  handleClose,
  handlePrevious,
  handleNext,
  onNextImgClick,
  onPreviousImgClick,
  handleDownload,
  imgSrc,
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

  const sliderRef = useRef(null);

  useEffect(() => {
    const overlay = document.querySelector(".portalOverlay");
    overlay.addEventListener("click", handleClose);

    return () => {
      overlay.removeEventListener("click", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="slider" ref={sliderRef}>
      <SliderButton
        icon={<GrClose />}
        handleClick={handleClose}
        className="sliderCloseButton"
        buttonRef={closeButtonRef}
      />
      <SliderButton
        icon={<IoMdDownload />}
        handleClick={handleDownload}
        className="sliderDownloadButton"
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
      {cldImage ? (
        <AdvancedImage
          className="sliderImage"
          cldImg={cldImage}
          plugins={[placeholder({ mode: "blur" })]}
        />
      ) : (
        <img className="sliderImage" src={imgSrc} />
      )}
    </div>
  );
};

export default Slider;
