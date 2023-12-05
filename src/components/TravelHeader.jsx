import React, { useEffect, useRef } from "react";
import { FaPlaneArrival } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/travelHeader.css";

import {
  updateInputAction,
  updateShowDropdownAction,
} from "../reducers/mapReducer";
import MapToggle from "./MapToggle";

const TravelHeader = ({ state, action, onCountryClick, selectedCountry }) => {
  const dropdownWrapperRef = useRef(null);
  const inputRef = useRef(null);

  const countryMap = state.filteredCountryList.map((country) => {
    return (
      <div
        onClick={() => onCountryClick(country)}
        key={country}
        className="dropdownItem"
      >
        {country}
      </div>
    );
  });

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

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(state.inputValue);
  };
  return (
    <div className="travelHeader">
      <MapToggle />
      <h3 className="greetings">Pick destination:</h3>
      <div ref={dropdownWrapperRef} className="dropdownWrapper">
        <input
          ref={inputRef}
          placeholder="Search..."
          value={state.inputValue}
          onChange={(e) => action(updateInputAction(e.currentTarget.value))}
          onFocus={() => {
            action(updateShowDropdownAction(true));
          }}
        />
        {state.showDropdown && <div className="dropdown">{countryMap}</div>}
      </div>
      <div className={"visitButtonContainer"}>
        <button
          className="visitButton"
          disabled={!selectedCountry}
          onClick={handleButtonClick}
        >
          Visit
          <FaPlaneArrival className="buttonIcon" />
        </button>
      </div>
    </div>
  );
};

export default TravelHeader;
