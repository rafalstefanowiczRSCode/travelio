import "../styles/mapToggle.css";
import { FaUnsplash, FaCamera } from "react-icons/fa6";

const MapToggle = () => {
  return (
    <div className="toggleContainer">
      <button className="toggleOption selected">
        <FaCamera className="toggleSvg" />
        RSCode
      </button>
      <button className="toggleOption">
        <FaUnsplash className="toggleSvg" />
        Unsplash
      </button>
    </div>
  );
};
export default MapToggle;
