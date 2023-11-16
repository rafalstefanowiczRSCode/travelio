import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryInfo = () => {
  const { country } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${country}`
        );
        const data = await response.json();
        setData(data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [country]);

  console.log(data);
  console.log(error);
  console.log(isLoading);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={data.flags.svg} alt="flag" style={{ width: "150px" }}></img>
        <h1>{data.name.common}</h1>
      </div>
      <div></div>
    </div>
  );
};

export default CountryInfo;
