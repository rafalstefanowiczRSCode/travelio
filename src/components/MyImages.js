import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

const getUrl = (tag) => {
  const cloudName = "dduk3mqt0";
  return `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
};

const CountryImages = () => {
  const { tag } = useParams();
  const [images, setImages] = useState([]);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      const url = getUrl(tag);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImages(data.resources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [tag]);

  const observer = useRef(null);
  useEffect(() => {
    return () => {
      observer.current && observer.current.disconnect();
    };
  }, []);

  const lastBookElementRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !error) {
        fetchImages();
      }
    });
    if (node) observer.current.observe(node);
  };

  const gridRef = useRef(null);
  const masonry = useRef(null);

  useEffect(() => {
    if (!gridRef.current && !images.length) return;
    const imgLoad = imagesLoaded(gridRef.current);

    const onLoad = () => {
      const photosEl = document.querySelectorAll(".grid .photo");
      photosEl.forEach((el) => {
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
      setIsLoading(false);
    };

    // progress - layout every single image load  / always- layout when all images  has been loaded
    imgLoad.on("always", onLoad);
    return () => {
      imgLoad.off("always", onLoad);
    };
  }, [images.length]);

  const mapPhotos = images.map((item, id) => {
    return (
      <div
        ref={id + 1 === images.length && !isLoading ? lastBookElementRef : null}
        className="grid-item"
        key={item.id}
      >
        <div className="photoContainer">
          <img
            src={item.urls.regular}
            alt={item.alt_description}
            className="photo"
          ></img>
          <div className="photoDetails">
            <img src={item.user.profile_image.medium}></img>
            <p className="photoAuthorName">
              {item.user.first_name} {item.user.last_name}
            </p>
            {/* <p>{item.description}</p> */}
          </div>
        </div>
      </div>
    );
  });

  // to do
  if (error && !error.includes("Rate Limit Exceeded")) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div ref={gridRef} className="grid">
        {mapPhotos}
      </div>

      <div>
        {error.includes("Rate Limit Exceeded") && (
          <div>
            <h1>Rate Limit Exceeded</h1>

            <button
              onClick={() => {
                fetchImages();
              }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
      {isLoading && <h1>Loading</h1>}
    </>
  );
};

export default CountryImages;
