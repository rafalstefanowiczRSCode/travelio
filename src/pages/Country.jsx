import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryBack from "../components/CountryBack";
import CountryImages from "../components/CountryImages";

const Country = () => {
  return (
    <div className="countryPage">
      <CountryBack />
      <CountryInfo />
      <CountryImages />
    </div>
  );
};
export default transition(Country);
