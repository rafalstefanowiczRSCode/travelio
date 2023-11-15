import { useEffect, useReducer } from "react";

import { useSearchParams } from "react-router-dom";
import TravelHeader from "../components/TravelHeader";
import plane from "../icons/plane.svg";
import Globe from "../components/Globe";
import mapReducer from "../reducers/mapReducer";
import { countryList } from "../utils.js/countryList";
import { selectCountryAction } from "../reducers/mapReducer";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, action] = useReducer(mapReducer, {
    inputValue: searchParams.get("search") || "",
    showDropdown: false,
    filteredCountryList: countryList,
  });

  useEffect(() => {
    if (state.inputValue) setSearchParams({ search: state.inputValue });
  }, [state.inputValue, setSearchParams]);

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
