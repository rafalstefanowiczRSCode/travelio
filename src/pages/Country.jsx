import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryImages from "../components/CountryImages";
import CountryBack from "../components/CountryBack";
import MyImages from "../components/MyImages";

const Country = () => {
  return (
    <div className="countryPage">
      <CountryBack />
      <CountryInfo />
      <MyImages />
      <CountryImages />
    </div>
  );
};
export default transition(Country);
