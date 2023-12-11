import React, { createContext, useCallback, useContext, useState } from "react";

import { queryClient } from "../main";

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

export const ImageContext = createContext(null);

const PreloadImageContext = ({ children }) => {
  //to do
  const [preloadedImages, setPreloadedImages] = useState({
    rsCodeImages: [],
    unsplashImages: [],
  });

  const handlePreloadImages = useCallback((country, isRsCode) => {
    const key = isRsCode ? "rsCodeImages" : "unsplashImages";
    const queryKey = [key, country];
    const data = queryClient.getQueryData(queryKey);

    data.pages[0].results.forEach((image) => {
      preloadImage(image.urls.regular);
    });

    setPreloadedImages((prev) => {
      const updatedList = [...prev[key], country];
      return { ...prev, [key]: updatedList };
    });
  }, []);

  return (
    <ImageContext.Provider value={{ handlePreloadImages }}>
      {children}
    </ImageContext.Provider>
  );
};

export default PreloadImageContext;
