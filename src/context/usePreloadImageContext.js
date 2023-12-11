import { useContext } from "react";
import { ImageContext } from "./PreloadImageContext";

export const usePreloadImageContext = () => useContext(ImageContext);
