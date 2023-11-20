import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

const getApiUrl = (search, page) =>
  `https://api.unsplash.com/search/photos?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg&page=${page}&query=${search}`;

const CountryImages = () => {
  const { country } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);
  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        //to do retrieve has more from db
        if (entries[0].isIntersecting && "hasMore") {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(country, page));
        const data = await response.json();
        setData((prevData) => [...prevData, ...data.results]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (data.length < page * 10) fetchData();
  }, [country, page]);

  const mapPhotos = data.map((item, id) => {
    return (
      <div
        ref={id + 1 === data.length ? lastBookElementRef : null}
        className="grid-item"
        key={item.id}
        style={{ width: "33.3333%" }}
      >
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

  const masonry = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const imgLoad = imagesLoaded(gridRef.current);

    const onLoad = (elements) => {
      setIsLoading(true);
      document.querySelectorAll(".grid .photo").forEach((el) => {
        el.style.visibility = "visible";
      });
      if (!masonry.current) {
        masonry.current = new Masonry(gridRef.current, {
          itemSelector: ".grid-item",
          columnWidth: ".grid-item",
          percentPosition: true,
          transitionDuration: 0,
        });
      } else {
        masonry.current.reloadItems();
        masonry.current.layout();
      }
    };

    //progress - layout every single image load  / always- layout when all images  has been loaded
    imgLoad.on("always", onLoad);
    return () => {
      imgLoad.off("always", onLoad);
    };
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div ref={gridRef} className="grid">
        {mapPhotos}
      </div>
      <button
        onClick={() => {
          setPage((prevPage) => prevPage + 1);
        }}
      >
        fetch more
      </button>
    </>
  );
};

export default CountryImages;
