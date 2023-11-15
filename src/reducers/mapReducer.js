const ACTION_TYPES = {
  updateInput: "UPDATE_INPUT",
  selectCountry: "SELECT_COUNTRY",
  updateShowDropdown: "UPDATE_SHOW_DROPDOWN",
};

import { countryList, filterCountryList } from "../utils.js/countryList";

const mapReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.updateInput:
      return {
        ...state,
        showDropdown: true,
        inputValue: action.payload,
        filteredCountryList: filterCountryList(countryList, action.payload),
      };

    case ACTION_TYPES.selectCountry:
      return {
        ...state,
        showDropdown: false,
        inputValue: action.payload,
        filteredCountryList: countryList,
      };

    case ACTION_TYPES.updateShowDropdown:
      return {
        ...state,
        showDropdown: action.payload,
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

export const updateShowDropdownAction = (showDropdown) => {
  return { type: ACTION_TYPES.updateShowDropdown, payload: showDropdown };
};

export default mapReducer;
