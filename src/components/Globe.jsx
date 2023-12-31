import React, { useEffect, useRef } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

import visitedCountries from "../constants/visitedCountries";
import { countryNames } from "../utils/countryList";
import { debounce } from "../utils/debounce";
import { useMapContext } from "../reducers/mapReducer";

const Globe = ({ onCountryClick, selectedCountry }) => {
  const isInitialMount = useRef(true);
  const {
    state: { rsCodeSelected },
  } = useMapContext();

  // move plane while selectedCountry changed
  useEffect(() => {
    if (selectedCountry) {
      movePlane(countryNames[selectedCountry], isInitialMount.current === true);
    }

    isInitialMount.current = false;
  }, [selectedCountry]);

  // move plane when user resize page
  useEffect(() => {
    if (!selectedCountry) return;
    const resizeListener = debounce(() => {
      movePlane(countryNames[selectedCountry]);
    }, 150);

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [selectedCountry]);

  const movePlane = (code, firstMount) => {
    const countryEl = [
      ...document.querySelectorAll(`[data-code="${code}"]`),
    ][0];
    if (!countryEl) return;

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
      const canadaDimensions = [
        ...document.querySelectorAll(`[data-code="CA"]`),
      ][0].getBoundingClientRect();

      newLeftPlanePosition =
        canadaDimensions.left + canadaDimensions.width / 2 + "px";
      newTopPlanePosition =
        countryDimensions.top + (countryDimensions.height * 2) / 3 + "px";
    }

    // rotate the plane if it's needed
    let planeTransition = "";
    let planeTransform = "";
    if (
      parseInt(currentPlaneStyle.left) > parseInt(newLeftPlanePosition) &&
      angle > 0
    ) {
      planeTransition = "transform 1s ease, left 3s ease 1s, top 3s ease 1s";
      planeTransform = "translate(-50%, -50%) rotate(-135deg)";
    } else if (
      parseInt(currentPlaneStyle.left) < parseInt(newLeftPlanePosition) &&
      angle < 0
    ) {
      planeTransition = "transform 1 ease, left 3s ease 1s, top 3s ease 1s";
      planeTransform = "translate(-50%, -50%) rotate(45deg)";
    } else {
      planeTransition = "left 3s ease, top 3s ease";
      planeTransform = "translate(-50%, -50%) rotate(45deg);";
    }
    if (firstMount) planeTransition = "none";

    // set the new plane position
    planeImg.style.transition = planeTransition;
    planeImg.style.transform = planeTransform;
    planeImg.style.top = newTopPlanePosition;
    planeImg.style.left = newLeftPlanePosition;
  };

  const onRegionTipShow = (_, label, code) => {
    const isVisited = visitedCountries.find((visited) => visited === code);
    const path = document.querySelector(`path[data-code=${code}]`);
    if (isVisited && path) path.classList.add("visited");

    return label.html(`
        <span class=${isVisited && "visited"}>
             ${label.html()}
        </span>`);
  };

  useEffect(() => {
    const tipElements = document.querySelectorAll(".jvectormap-tip");
    tipElements.forEach((el, id) => {
      if (id < tipElements.length - 1) {
        el.remove();
      }
    });

    rsCodeSelected
      ? tipElements[tipElements.length - 1].classList.add("rsCode")
      : tipElements[tipElements.length - 1].classList.remove("rsCode");
  }, [rsCodeSelected]);

  return (
    <VectorMap
      className={`vectorMap ${rsCodeSelected ? "rsCode " : ""}`}
      backgroundColor="transparent"
      style={{
        height: "calc(100% - 80px)",
      }}
      zoomOnScroll={false}
      onRegionTipShow={onRegionTipShow}
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
