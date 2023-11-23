import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryImages from "../components/CountryImages";

const Country = () => {
  return (
    <div className="countryPage">
      <CountryInfo />
      <CountryImages />
    </div>
  );
};
export default transition(Country);
