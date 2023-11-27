import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { useParams } from "react-router-dom";

const cloudName = "dduk3mqt0";
const MyImages = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { country } = useParams();
  const imagePerPage = 10;

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
  const lastBookElementRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
        console.log("is intersecting fire");
        console.log("page", page);
      }
    });
    console.log("node", node);
    console.log("page", page);
    if (node) observer.current.observe(node);
  };

  const images = data.slice(0, page * imagePerPage);
  const lastPage = page * imagePerPage >= data.length;

  const mapImages = images.map((image, id) => {
    const cldImage = cld.image(image.public_id);
    // cldImage.quality("auto").format("auto");
    // .effect("e_sharpen"); //to do check different effects
    //to do remove styles to separate folder
    return (
      <div
        ref={images.length === id + 1 && !lastPage ? lastBookElementRef : null}
        key={image.public_id}
        style={{ minHeight: "200px" }}
      >
        <AdvancedImage
          key={image.public_id}
          style={{ width: "400px" }}
          cldImg={cldImage}
          plugins={[
            placeholder({ mode: "blur" }),
            lazyload({ threshold: 0.15 }), //Load an image when 25% of it is visible. Specify a bounding box around the root element with margins, top: 10px, right: 20px, bottom: 10px, left: 30px:
          ]}
        />
      </div>
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{mapImages}</div>
  );
};

export default MyImages;
