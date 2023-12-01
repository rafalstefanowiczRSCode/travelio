import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryImages from "../components/CountryImages";
import CountryBack from "../components/CountryBack";
import UnsplashImages from "../components/UnsplashImages";
import MyImages from "../components/MyImages";

const Country = () => {
  return (
    <div className="countryPage">
      <CountryBack />
      <CountryInfo />
      {/* <MyImages /> */}
      <UnsplashImages />
    </div>
  );
};
export default transition(Country);
