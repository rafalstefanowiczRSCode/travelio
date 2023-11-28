import React, { useCallback, useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import Image from "./Image";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { useParams } from "react-router-dom";
import "../styles/myImages.css";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

const cloudName = "dduk3mqt0";
const MyImages = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { country } = useParams();
  const imagePerPage = 6;
  const images = data.slice(0, page * imagePerPage);
  const lastPage = page * imagePerPage >= data.length;
  const [isLoading, setIsLoading] = useState(true);

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${country}.json`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data.resources);

        //to do handle error and loading
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchData();
  }, [country]);

  const observer = useRef(null);
  const lastBookElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
        setIsLoading(true);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  const gridRef = useRef(null);
  const masonry = useRef(null);

  useEffect(() => {
    const onLoad = (instance, image) => {
      if (image.isLoaded) image.img.classList.add("imageLoaded");

      if (!masonry.current) {
        masonry.current = new Masonry(gridRef.current, {
          itemSelector: ".myImages .containerImage:has(.imageLoaded)",
          columnWidth: ".myImages .containerImage:has(.imageLoaded)",
          percentPosition: true,
          transitionDuration: 0,
        });
      } else {
        masonry.current.reloadItems();
        masonry.current.layout();
      }

      const allImageLoaded = instance.progressedCount === images.length;
      if (allImageLoaded) {
        setIsLoading(false);
      }
    };

    if (!gridRef.current) return;
    const imgLoad = imagesLoaded(gridRef.current);
    imgLoad.on("progress", onLoad);
    return () => {
      imgLoad.off("progress", onLoad);
    };
  }, [images]);

  const mapImages = images.map((image, id) => {
    const cldImage = cld.image(image.public_id);
    // cldImage.quality("auto").format("auto");
    // .effect("e_sharpen"); //to do check different effects
    //to do remove styles to separate folder
    return (
      <Image
        key={image.public_id}
        containerRef={
          images.length === id + 1 && !lastPage && !isLoading
            ? lastBookElementRef
            : null
        }
        imageClass="image"
        containerClass="containerImage"
        cldImage={cldImage}
        isAdvancedImage
      />
    );
  });

  return (
    <>
      <div ref={gridRef} className="myImages">
        {mapImages}
      </div>
      {isLoading && <h1>loading....</h1>}
    </>
  );
};

export default MyImages;
