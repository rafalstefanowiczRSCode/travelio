import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import "../../styles/countryBack.css";

const CountryBack = () => {
  const { country } = useParams();
  const [isFixed, setIsFixed] = useState(false);
  const markerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = markerRef?.current;
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        rootMargin: "150px 0px 0px 0px",
      }
    );
    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, []);

  //to do - adjust styles with map button
  return (
    <div className="countryBack" ref={markerRef}>
      <button
        onClick={() => {
          navigate(`/?search=${country}`);
        }}
        className={`backButton ${isFixed ? "backButtonFixed" : ""}`}
      >
        <FaPlaneDeparture className="buttonIcon" />
        Map
      </button>
    </div>
  );
};

export default CountryBack;
