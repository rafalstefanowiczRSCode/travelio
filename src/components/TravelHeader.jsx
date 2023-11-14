import React, { useEffect, useReducer, useRef } from "react";
import { worldMill } from "@react-jvectormap/world";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaPlaneDeparture } from "react-icons/fa";
import { PiAirplaneTakeoffDuotone } from "react-icons/pi";

import { BiSolidPlaneLand } from "react-icons/bi";
// import { FaPlaneDeparture } from "react-icons/fa";
// import { PiAirplaneTakeoffDuotone } from "react-icons/pi";

import { BiLocationPlus } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const countryList = Object.values(worldMill.content.paths)
  .map(({ name }) => name)
  .sort();

const filterCountryList = (countryList, arg) => {
  const regex = new RegExp(arg, "i");
  return countryList.filter((country) => country.match(regex));
};

const ACTION_TYPES = {
  updateInput: "UPDATE_INPUT",
  selectCountry: "SELECT_COUNTRY",
  updateShowDropdown: "UPDATE_SHOW_DROPDOWN",
};

const dropdownReducer = (state, action) => {
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

const updateInputAction = (value) => {
  return { type: ACTION_TYPES.updateInput, payload: value };
};

const selectCountryAction = (value) => {
  return { type: ACTION_TYPES.selectCountry, payload: value };
};

const updateShowDropdownAction = (showDropdown) => {
  return { type: ACTION_TYPES.updateShowDropdown, payload: showDropdown };
};

const TravelHeader = () => {
  const [state, action] = useReducer(dropdownReducer, {
    inputValue: "",
    showDropdown: false,
    filteredCountryList: countryList,
  });

  const dropdownWrapperRef = useRef(null);
  const inputRef = useRef(null);

  const onInputChange = (e) => {
    action(updateInputAction(e.currentTarget.value));
  };

  const onCountryClick = (country) => {
    action(selectCountryAction(country));
  };

  const countryMap = state.filteredCountryList.map((country, id) => {
    return (
      <li
        onClick={() => onCountryClick(country)}
        key={country}
        className="dropdownItem"
      >
        {country}
      </li>
    );
  });

  const onInputFocus = () => {
    action(updateShowDropdownAction(true));
  };

  useEffect(() => {
    const listener = (e) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(e.target)
      ) {
        if (document.activeElement === inputRef?.current)
          inputRef.current.blur();
        if (state.showDropdown) action(updateShowDropdownAction(false));
      }
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [state.showDropdown]);

  return (
    <div className="travelHeader">
      <h3>Travel anywhere you want</h3>
      <div ref={dropdownWrapperRef} className="dropdownWrapper">
        <input
          ref={inputRef}
          placeholder="Search..."
          value={state.inputValue}
          onChange={onInputChange}
          onFocus={onInputFocus}
        />
        {state.showDropdown && <ul className="dropdown">{countryMap}</ul>}
      </div>
      <button>
        Visit
        <FaLocationDot className="buttonIcon" />
      </button>
    </div>
  );
};

export default TravelHeader;
