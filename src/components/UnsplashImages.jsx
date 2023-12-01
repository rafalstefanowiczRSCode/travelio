import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { memoImage as Image } from "./Image";
import { useParams } from "react-router-dom";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "../styles/myImages.css";
import imageDownload from "../utils/imageDownload";
import Portal from "./Portal";
import Slider from "./Slider";

const getApiUrl = (search, page) =>
  `https://api.unsplash.com/search/photos?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg&page=${page}&query=${search}`;

const UnsplashImages = () => {
  const { country } = useParams();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl(country, page));
      const data = await response.json();
      setTotalPages(data.total_pages);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage((currentPage) => currentPage + 1);
      setError("");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [country, isLoading, page]);

  useEffect(() => {
    fetchImages();
  }, []);

  const observer = useRef(null);
  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !error) {
          fetchImages();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchImages, error]
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

      setIsLoading(false);
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

  const lastPage = totalPages < page;
  const mapImages = useMemo(() => {
    return images.map((item, id) => {
      return (
        <Image
          key={item.id}
          containerRef={
            !lastPage && id + 1 === images.length && !isLoading
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
  }, [images, isLoading, lastBookElementRef, lastPage]);

  return (
    <>
      <div ref={gridRef} className="myImages">
        {mapImages}
      </div>
      {/* to do */}
      {isLoading && <h1>loading....</h1>}
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
      {/* to do */}
      {lastPage && <h1>Last Page</h1>}
      {/* to do error */}
    </>
  );
};

export default UnsplashImages;
