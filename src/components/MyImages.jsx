import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { memoImage as Image } from "./Image";
import { useParams } from "react-router-dom";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "../styles/myImages.css";
import imageDownload from "../utils/imageDownload";
import generateDescription from "../utils/generateDescription";
import Portal from "./Portal";
import Slider from "./Slider";
import PlaneLoader from "./PlaneLoader";
import Error from "./Error";

const cloudName = "daaemtupt";
const MyImages = () => {
  const { country } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [error, setError] = useState(false);

  const imagePerPage = 6;
  const images = useMemo(
    () => data.slice(0, page * imagePerPage),
    [data, page]
  );
  const lastPage = page * imagePerPage >= data.length;

  const cld = useMemo(
    () =>
      new Cloudinary({
        cloud: {
          cloudName,
        },
      }),
    []
  );

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
        setError(true);
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
    if (!images.length) return;
    const onLoad = (instance) => {
      instance.images.forEach((image) => {
        image.img.classList.add("imageLoaded");
      });

      if (!masonry.current) {
        masonry.current = new Masonry(gridRef.current, {
          itemSelector: ".myImages .containerImage",
          columnWidth: ".myImages .containerImage",
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
    imgLoad.on("always", onLoad);
    return () => {
      imgLoad.off("always", onLoad);
    };
  }, [images.length]);

  const onImageClick = (currentImg) => {
    setCurrentImg(currentImg);
    setIsSliderOpen(true);
  };

  const onNextImgClick = () => {
    setCurrentImg((currentImg) => {
      if (currentImg + 1 === images.length) return 0;
      return currentImg + 1;
    });
  };

  const onPreviousImgClick = () => {
    setCurrentImg((currentImg) => {
      if (currentImg === 0) return images.length - 1;
      return currentImg - 1;
    });
  };

  const onCloseSliderClick = () => {
    setIsSliderOpen(false);
  };

  const mapImages = useMemo(
    () =>
      images.map((image, id) => {
        const cldImage = cld.image(image.public_id);
        // cldImage.quality("auto").format("auto");
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
            onImageClick={() => {
              onImageClick(id);
            }}
            handleDownload={(e) => {
              e.stopPropagation();
              imageDownload(cldImage.toURL(), image.public_id);
            }}
          >
            <p className="imageDescription">
              {generateDescription(image.public_id)}
            </p>
          </Image>
        );
      }),
    [images, cld, isLoading, lastBookElementRef, lastPage]
  );

  const cldImage =
    currentImg !== null && cld.image(images[currentImg].public_id);

  if (error) {
    return <Error message="Cloudinary api error" crash />;
  }
  return (
    <>
      <div ref={gridRef} className="myImages">
        {mapImages}
      </div>
      {isLoading && <PlaneLoader />}
      {isSliderOpen && (
        <Portal>
          <Slider
            cldImage={cldImage}
            handleClose={onCloseSliderClick}
            onNextImgClick={onNextImgClick}
            onPreviousImgClick={onPreviousImgClick}
            handleDownload={() =>
              imageDownload(cldImage.toURL(), images[currentImg].public_id)
            }
          />
        </Portal>
      )}
    </>
  );
};

export default MyImages;
