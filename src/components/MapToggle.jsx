import "../styles/mapToggle.css";
import { FaUnsplash, FaCamera } from "react-icons/fa6";
import {
  updateRSCodeSelectedAction,
  useMapContext,
} from "../reducers/mapReducer";

const MapToggle = () => {
  const {
    action,
    state: { rsCodeSelected },
  } = useMapContext();

  return (
    <div className="toggleContainer">
      <button
        onClick={() => action(updateRSCodeSelectedAction(true))}
        className={`toggleOption ${rsCodeSelected && "selected"}`}
        disabled={rsCodeSelected}
      >
        <FaCamera className="toggleSvg" />
        RSCode
      </button>
      <button
        onClick={() => action(updateRSCodeSelectedAction(false))}
        className={`toggleOption ${!rsCodeSelected && "selected"}`}
        disabled={!rsCodeSelected}
      >
        <FaUnsplash className="toggleSvg" />
        Unsplash
      </button>
    </div>
  );
};
export default MapToggle;
