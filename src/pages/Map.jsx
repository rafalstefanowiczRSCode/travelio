import { useEffect, useReducer } from "react";

import "../styles/map.css";
import { useSearchParams } from "react-router-dom";
import TravelHeader from "../components/TravelHeader";
import plane from "../icons/plane.svg";
import Globe from "../components/Globe";
import mapReducer from "../reducers/mapReducer";
import { countryList, rSCodeCountryList } from "../utils/countryList";
import { selectCountryAction, MapContext } from "../reducers/mapReducer";
import { queryClient } from "../main";
import { getCountryInfo, getUnsplashImages } from "../utils/apiQueries";
import { usePreloadImageContext } from "../context/usePreloadImageContext";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get("search");
  const [state, action] = useReducer(mapReducer, {
    inputValue: searchParamsValue || "",
    showDropdown: false,
    filteredCountryList: countryList,
    rsCodeSelected: false,
  });

  const { handlePreloadImages } = usePreloadImageContext();

  useEffect(() => {
    if (!searchParamsValue) return;

    queryClient.prefetchQuery({
      queryKey: ["countryInfo", searchParamsValue],
      queryFn: () => getCountryInfo(searchParamsValue),
    });

    queryClient
      .prefetchInfiniteQuery({
        queryKey: ["unsplashImages", searchParamsValue],
        queryFn: ({ pageParam }) =>
          getUnsplashImages(searchParamsValue, pageParam),
      })
      .then(() => {
        handlePreloadImages(searchParamsValue, rsCodeSelected);
      });
  }, [searchParamsValue, handlePreloadImages]);

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
          selectedCountry={searchParamsValue}
        />
        <Globe
          onCountryClick={onCountryClick}
          selectedCountry={searchParamsValue}
        />
      </div>
    </MapContext.Provider>
  );
};

export default Map;
