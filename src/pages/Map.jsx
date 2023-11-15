import { useReducer } from "react";

import TravelHeader from "../components/TravelHeader";
import plane from "../icons/plane.svg";
import Globe from "../components/Globe";
import mapReducer from "../reducers/mapReducer";
import { countryList } from "../utils.js/countryList";
import { selectCountryAction } from "../reducers/mapReducer";
import { useLocation } from "react-router-dom";

const Map = () => {
  const [state, action] = useReducer(mapReducer, {
    inputValue: "",
    showDropdown: false,
    filteredCountryList: countryList,
  });
  const onCountryClick = (country) => {
    action(selectCountryAction(country));
  };

  return (
    <>
      <img src={plane} alt="plane" className="plane" />
      <TravelHeader
        state={state}
        action={action}
        onCountryClick={onCountryClick}
      />
      <Globe
        onCountryClick={onCountryClick}
        selectedCountry={state.inputValue}
      />
    </>
  );
};

export default Map;
