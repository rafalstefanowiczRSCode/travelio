import { useEffect, useReducer } from "react";

import { useSearchParams } from "react-router-dom";
import TravelHeader from "../components/TravelHeader";
import plane from "../icons/plane.svg";
import Globe from "../components/Globe";
import mapReducer from "../reducers/mapReducer";
import { countryList, rSCodeCountryList } from "../utils/countryList";
import { selectCountryAction, MapContext } from "../reducers/mapReducer";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, action] = useReducer(mapReducer, {
    inputValue: searchParams.get("search") || "",
    showDropdown: false,
    filteredCountryList: rSCodeCountryList,
    rsCodeSelected: true,
  });

  const { inputValue, rsCodeSelected } = state;
  useEffect(() => {
    const matchedCountryList = rsCodeSelected ? rSCodeCountryList : countryList;

    if (
      matchedCountryList.find(
        (country) => inputValue.toLowerCase() === country.toLowerCase()
      )
    ) {
      setSearchParams({ search: inputValue });
    } else {
      setSearchParams({});
    }
  }, [inputValue, rsCodeSelected, setSearchParams]);

  const onCountryClick = (country) => {
    action(selectCountryAction(country));
  };

  return (
    <MapContext.Provider value={{ state, action }}>
      <div className="map">
        <img src={plane} alt="plane" className="plane" />
        <TravelHeader
          state={state}
          action={action}
          onCountryClick={onCountryClick}
          selectedCountry={searchParams.get("search")}
        />
        <Globe
          onCountryClick={onCountryClick}
          selectedCountry={searchParams.get("search")}
        />
      </div>
    </MapContext.Provider>
  );
};

export default Map;
