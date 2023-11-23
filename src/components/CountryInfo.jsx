import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryDetails from "./CountryDetails";
import "../../styles/countryInfo.css";

const CountryInfo = () => {
  const { country } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        const data = await response.json();
        if (data.message) throw Error(data.message);
        setData(data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [country]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.log(error);
    return <h1>error</h1>;
  }
  return (
    <div className="countryInfo">
      <div className="mainContainer">
        <img className="flag" src={data.flags.svg} alt="flag"></img>
        <h1 className="name">{data.name.common}</h1>
      </div>
      <div>
        <CountryDetails
          capital={data.capital[0]}
          languages={Object.values(data.languages)}
          currencies={Object.values(data.currencies).map(({ name }) => name)}
          population={data.population}
        />
      </div>
    </div>
  );
};

export default CountryInfo;
