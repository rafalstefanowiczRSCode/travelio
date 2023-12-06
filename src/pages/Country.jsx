import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryBack from "../components/CountryBack";
import UnsplashImages from "../components/UnsplashImages";
import MyImages from "../components/MyImages";
import ToggleUnsplash from "../components/ToggleUnsplash";
import { useMemo, useState } from "react";
import "../styles/country.css";
import { useParams } from "react-router-dom";
import { rSCodeCountryList } from "../utils/countryList";

const Country = () => {
  const { country } = useParams();
  const isVisited = useMemo(
    () =>
      !!rSCodeCountryList.find((visitedCountry) => country === visitedCountry),
    [country]
  );
  const [unsplashVisible, setUnsplashVisible] = useState(!isVisited);
  const toggleUnsplashVisible = () => {
    setUnsplashVisible((prev) => !prev);
  };

  return (
    <div className="countryPage">
      <CountryBack />
      <CountryInfo />
      {isVisited && (
        <>
          <MyImages />
          <ToggleUnsplash
            unsplashVisible={unsplashVisible}
            onToggleClick={toggleUnsplashVisible}
          />
        </>
      )}

      {unsplashVisible && <UnsplashImages />}
    </div>
  );
};
export default transition(Country);
