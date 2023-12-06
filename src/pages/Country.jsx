import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryImages from "../components/CountryImages";
import CountryBack from "../components/CountryBack";
import UnsplashImages from "../components/UnsplashImages";
import MyImages from "../components/MyImages";
import ToggleUnsplash from "../components/ToggleUnsplash";
import { useState } from "react";
import "../styles/country.css";

const Country = () => {
  const [showUnsplash, setShowUnsplash] = useState(false);
  return (
    <div className="countryPage">
      <CountryBack />
      <CountryInfo />
      <MyImages />
      <ToggleUnsplash />
      <UnsplashImages />
    </div>
  );
};
export default transition(Country);
