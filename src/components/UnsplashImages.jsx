import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "../styles/myImages.css";
import imageDownload from "../utils/imageDownload";
import { memoImage as Image } from "./Image";
import Portal from "./Portal";
import Slider from "./Slider";
import { getUnsplashImages } from "../utils/apiQueries";
import PlaneLoader from "./PlaneLoader";
import Error from "./Error";

const UnsplashImages = () => {
  const { country } = useParams();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);

  const { fetchNextPage, data, hasNextPage, error, isError } = useInfiniteQuery(
    {
      queryKey: ["unsplashImages", country],
      getNextPageParam: (prevData, data) => {
        if (prevData.total_pages === data.length) {
          return null;
        }
        return data.length + 1;
      },
      queryFn: ({ pageParam }) => getUnsplashImages(country, pageParam),
    }
  );

  const images = useMemo(
    () =>
      data?.pages
        .filter(({ errors }) => !errors)
        .flatMap(({ results }) => results) || [],
    [data]
  );

  const observer = useRef(null);
  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !error) {
          setIsImageLoading(true);
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [error, fetchNextPage]
  );

  const gridRef = useRef(null);
  const masonry = useRef(null);
  useEffect(() => {
    if (!gridRef.current || !images.length) return;

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

      setIsImageLoading(false);
    };

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

  const mapImages = useMemo(() => {
    return images.map((item, id) => {
      return (
        <Image
          key={item.id}
          containerRef={
            hasNextPage && id + 1 === images.length && !isImageLoading
              ? lastBookElementRef
              : null
          }
          imageClass="image"
          containerClass="containerImage"
          imgSrc={item.urls.regular}
          imgAlt={item.alt_description}
          onImageClick={() => {
            onImageClick(id);
          }}
          handleDownload={(e) => {
            e.stopPropagation();
            imageDownload(item.urls.full, item.id);
          }}
        >
          <div className="authorContainer">
            <img
              className="authorImg"
              src={item.user.profile_image.medium}
            ></img>
            <p className="authorName">
              {item.user.first_name} {item.user.last_name}
            </p>
          </div>
        </Image>
      );
    });
  }, [images, isImageLoading, lastBookElementRef, hasNextPage]);

  const renderError = () => {
    const rateLimitExceed = !!error?.message.includes("Rate Limit Exceeded");
    const isApiError = data?.pages[0].errors || isError;

    if (rateLimitExceed) {
      return <Error message="Rate Limit Exceed" />;
    }

    if (isApiError) {
      return <Error message="Unsplash api error" crash />;
    }

    if (isImageLoading) {
      return <PlaneLoader />;
    }

    if (images.length && !hasNextPage) {
      return <Error message="Last Page" />;
    }
  };

  return (
    <>
      <div ref={gridRef} className="myImages">
        {mapImages}
      </div>
      {renderError()}

      {isSliderOpen && (
        <Portal>
          <Slider
            imgSrc={images[currentImg].urls.regular}
            handleClose={onCloseSliderClick}
            onNextImgClick={onNextImgClick}
            onPreviousImgClick={onPreviousImgClick}
            handleDownload={() =>
              imageDownload(images[currentImg].urls.full, images[currentImg].id)
            }
          />
        </Portal>
      )}
    </>
  );
};

export default UnsplashImages;
