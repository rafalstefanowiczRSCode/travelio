import { createContext, useContext } from "react";

import {
  countryList,
  filterCountryList,
  rSCodeCountryList,
} from "../utils/countryList";

const ACTION_TYPES = {
  updateInput: "UPDATE_INPUT",
  selectCountry: "SELECT_COUNTRY",
  updateShowDropdown: "UPDATE_SHOW_DROPDOWN",
  updateRSCodeSelected: "UPDATE_RSCODE_SELECTED",
};

const mapReducer = (state, { type, payload }) => {
  const matchedCountryList = state.rsCodeSelected
    ? rSCodeCountryList
    : countryList;
  switch (type) {
    case ACTION_TYPES.updateInput:
      return {
        ...state,
        showDropdown: true,
        inputValue: payload,
        filteredCountryList: filterCountryList(matchedCountryList, payload),
      };

    case ACTION_TYPES.selectCountry:
      if (
        !state.rsCodeSelected ||
        rSCodeCountryList.find((country) => country === payload)
      ) {
        return {
          ...state,
          showDropdown: false,
          inputValue: payload,
          filteredCountryList: matchedCountryList,
        };
      }
      return state;

    case ACTION_TYPES.updateShowDropdown:
      return {
        ...state,
        showDropdown: payload,
      };

    case ACTION_TYPES.updateRSCodeSelected:
      return {
        ...state,
        inputValue: "",
        filteredCountryList: payload ? rSCodeCountryList : countryList,
        showDropdown: false,
        rsCodeSelected: payload,
      };

    default:
      return state;
  }
};

export const updateInputAction = (value) => {
  return { type: ACTION_TYPES.updateInput, payload: value };
};

export const selectCountryAction = (value) => {
  return { type: ACTION_TYPES.selectCountry, payload: value };
};

export const updateShowDropdownAction = (value) => {
  return { type: ACTION_TYPES.updateShowDropdown, payload: value };
};

export const updateRSCodeSelectedAction = (value) => {
  return { type: ACTION_TYPES.updateRSCodeSelected, payload: value };
};

export const MapContext = createContext();
export const useMapContext = () => useContext(MapContext);

export default mapReducer;
