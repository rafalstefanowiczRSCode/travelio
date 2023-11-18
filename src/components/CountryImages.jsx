import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
//move acces key to env

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

  // if (data.length) {
  //   console.log("download ?? ", data[0].links.download);
  //   console.log("download ?? ", data[0].links.download);
  //   console.log("show full on zoom", data[0].urls.regular);
  // }

  console.log(data);
  const mapPhotos = data.map((item) => {
    return (
      <div className="grid-item" key={item.id} style={{ width: "300px" }}>
        <img
          src={item.urls.regular}
          alt={item.alt_description}
          className="photo"
        ></img>
        {/* <h3>{`${item.user.first_name} ${item.user.last_name}`}</h3>
        <img src={item.user.profile_image.medium}></img>
        <p>{item.description}</p> */}
      </div>
    );
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {mapPhotos}
      </Masonry>
    </>
  );
};

export default CountryImages;

// import { useParams, Link } from "react-router-dom";
// import React, { useEffect, useState, useRef } from "react";
// import Masonry from "masonry-layout";

// //move acces key to env
// // const getApiUrl = (search) =>
// //   `https://api.unsplash.com/photos/?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg`;
// const getApiUrl = (search) =>
//   `https://api.unsplash.com/search/photos?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg&page=1&query=${search}`;

// const CountryImages = () => {
//   const { country } = useParams();
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(getApiUrl(country));
//         const data = await response.json();
//         console.log(data);
//         setData(data.results);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [country]);

//   console.log(data);
//   console.log(error);
//   console.log(isLoading);

//   // if (data.length) {
//   //   console.log("download ?? ", data[0].links.download);
//   //   console.log("download ?? ", data[0].links.download);
//   //   console.log("show full on zoom", data[0].urls.regular);
//   // }
//   const gridRef = useRef(null);

//   useEffect(() => {
//     new Masonry(gridRef.current, {
//       // options...
//       itemSelector: ".grid-item",
//       columnWidth: 300,
//     });
//   }, [data]);

//   const mapPhotos = data.map((item) => {
//     return (
//       <div className="grid-item" key={item.id} style={{ width: "300px" }}>
//         <img
//           src={item.urls.regular}
//           alt={item.alt_description}
//           className="photo"
//         ></img>
//         {/* <h3>{`${item.user.first_name} ${item.user.last_name}`}</h3>
//         <img src={item.user.profile_image.medium}></img>
//         <p>{item.description}</p> */}
//       </div>
//     );
//   });

//   if (isLoading) {
//     return <h1>Loading</h1>;
//   }
//   return (
//     <div ref={gridRef} className="grid">
//       {mapPhotos}
//     </div>
//   );
// };

// export default CountryImages;
