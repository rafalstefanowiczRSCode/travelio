import transition from "../transition";
import CountryInfo from "../components/CountryInfo";
import CountryImages from "../components/CountryImages";
import MyImages from "../components/MyImages";

const Country = () => {
  return (
    <div className="countryPage">
      <CountryInfo />
      <MyImages />
      {/* <CountryImages /> */}
    </div>
  );
};
export default transition(Country);
