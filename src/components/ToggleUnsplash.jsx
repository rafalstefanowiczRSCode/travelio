import "../styles/toggleUnsplash.css";
import { FaUnsplash } from "react-icons/fa6";

const ToggleUnsplash = ({ onToggleClick, unsplashVisible }) => {
  return (
    <div className="toggleUnsplash">
      {!unsplashVisible ? (
        <button className="toggleButton" onClick={onToggleClick}>
          <span>Show Unsplash Images</span>
        </button>
      ) : (
        <>
          <div className="breakLine"></div>
          <h2 className="unsplash">
            <FaUnsplash className="unsplashIcon" />
            Unsplash
          </h2>
        </>
      )}
    </div>
  );
};
export default ToggleUnsplash;
