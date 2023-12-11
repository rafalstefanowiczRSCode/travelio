import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CountryDetails from "./CountryDetails";
import "../styles/countryInfo.css";
import { getCountryInfo } from "../utils/apiQueries";

const CountryInfo = () => {
  const { country } = useParams();

  //to do handle errors
  const countryInfoQuery = useQuery({
    queryKey: ["countryInfo", country],
    queryFn: () => getCountryInfo(country),
  });

  if (countryInfoQuery.isLoading || countryInfoQuery.isError) {
    return <div className="countryInfo"></div>;
  }

  const data = countryInfoQuery.data;
  return (
    <div className="countryInfo">
      <div className="mainContainer">
        <img className="flag" src={data.flags.svg} alt="flag"></img>
        <h1 className="name">{data.name.common}</h1>
      </div>
      <CountryDetails
        capital={data.capital[0]}
        languages={Object.values(data.languages)}
        currencies={Object.values(data.currencies).map(({ name }) => name)}
        population={data.population}
      />
    </div>
  );
};

export default CountryInfo;
