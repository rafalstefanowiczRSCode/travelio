import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

//move acces key to env
// const getApiUrl = (search) =>
//   `https://api.unsplash.com/photos/?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg`;
const getApiUrl = (search) =>
  `https://api.unsplash.com/search/photos?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg&page=1&query=${search}`;

const CountryImages = () => {
  const { country } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(country));
        const data = await response.json();
        console.log(data);
        setData(data.results);
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

  if (data.length) {
    console.log("download ?? ", data[0].links.download);
    console.log("download ?? ", data[0].links.download);
    console.log("show full on zoom", data[0].urls.regular);
  }

  const mapPhotos = data.map((item) => {
    return (
      <div key={item.id} style={{ margin: "40px" }}>
        <h3>{`${item.user.first_name} ${item.user.last_name}`}</h3>
        <img src={item.user.profile_image.medium}></img>
        <img
          src={item.urls.regular}
          alt={item.alt_description}
          width={"400px"}
        ></img>
        <p>{item.description}</p>
      </div>
    );
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return <div>{mapPhotos}</div>;
};

export default CountryImages;
