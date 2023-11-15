import React, { useEffect } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

import visitedCountries from "../constants/visitedCountries";
import { countryList, countryNames } from "../utils.js/countryList";

const Globe = ({ onCountryClick, selectedCountry }) => {
  useEffect(() => {
    if (countryList.find((country) => selectedCountry === country)) {
      movePlaneOnRegionClick(countryNames[selectedCountry]);
    }
  }, [selectedCountry]);

  const movePlaneOnRegionClick = (code) => {
    const countryEl = [
      ...document.querySelectorAll(`[data-code="${code}"]`),
    ][0];

    const countryDimensions = countryEl.getBoundingClientRect();
    const planeImg = document.getElementsByClassName("plane")[0];
    const currentPlaneStyle = window.getComputedStyle(planeImg);

    let newLeftPlanePosition =
      countryDimensions.left + countryDimensions.width / 2 + "px";

    let newTopPlanePosition =
      countryDimensions.top + countryDimensions.height / 2 + "px";

    let angle;

    // calculate current plane angle (direction)
    if (currentPlaneStyle.transform.startsWith("matrix(")) {
      let values = currentPlaneStyle.transform
        .split("(")[1]
        .split(")")[0]
        .split(",");
      let a = values[0];
      let b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
      angle = 0;
    }

    // Hack for the US, as it spans the entire width of the map.
    if (code === "US") {
      newLeftPlanePosition = countryDimensions.width / 4.2 + "px";
      newTopPlanePosition =
        countryDimensions.top + (countryDimensions.height * 2) / 3 + "px";
    }

    // rotate the plane if it's needed
    if (
      parseInt(currentPlaneStyle.left) > parseInt(newLeftPlanePosition) &&
      angle > 0
    ) {
      planeImg.style.transition =
        "transform 1s ease, left 3s ease 1s,  top 3s ease 1s";
      planeImg.style.transform = "translate(-50%, -50%) rotate(-135deg)";
    } else if (
      parseInt(currentPlaneStyle.left) < parseInt(newLeftPlanePosition) &&
      angle < 0
    ) {
      planeImg.style.transition =
        "transform 1 ease, left 3s ease 1s, top 3s ease 1s";
      planeImg.style.transform = "translate(-50%, -50%) rotate(45deg)";
    } else {
      planeImg.style.transition = "left 3s ease, top 3s ease";
    }

    // set the new plane direction
    planeImg.style.top = newTopPlanePosition;
    planeImg.style.left = newLeftPlanePosition;
  };

  return (
    <VectorMap
      className={"vectorMap"}
      backgroundColor="transparent"
      style={{ height: "80vh" }}
      zoomOnScroll={false}
      // todo
      onRegionTipShow={(_, label) => {
        return label.html(`
        <span class="tip">
             ${label.html()}
        </span>`);
      }}
      map={worldMill}
      selectedRegions={visitedCountries}
      regionStyle={{
        selected: {
          fill: "#7CBF60",
        },
      }}
      onRegionClick={(_, code) =>
        onCountryClick(worldMill.content.paths[code].name)
      }
    />
  );
};

export default Globe;
