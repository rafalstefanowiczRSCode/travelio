import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "../../styles/countryBack.css";

const CountryBack = () => {
  const { country } = useParams();
  const [isFixed, setIsFixed] = useState(false);
  const markerRef = useRef(null);

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

  return (
    <div className="countryBack" ref={markerRef}>
      <Link to={`/?search=${country}`}>
        <button className={isFixed ? "backButtonFixed" : ""}>Map</button>
      </Link>
    </div>
  );
};

export default CountryBack;
