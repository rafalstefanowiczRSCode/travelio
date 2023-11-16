import transition from "../transition";
import CountryInfo from "./CountryInfo";
import CountryBack from "../components/CountryBack";
import CountryImages from "./CountryImages";

const Country = () => {
  return (
    <div>
      <CountryBack />
      <CountryInfo />
      <CountryImages />
    </div>
  );
};
export default transition(Country);
