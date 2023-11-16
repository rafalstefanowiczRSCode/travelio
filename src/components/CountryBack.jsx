import React from "react";
import { useParams, Link } from "react-router-dom";

const CountryBack = () => {
  const { country } = useParams();
  return (
    <div>
      <Link to={`/?search=${country}`}>Map</Link>
      CountryBack
    </div>
  );
};

export default CountryBack;
