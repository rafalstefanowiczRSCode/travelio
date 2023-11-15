import transition from "../transition";
import { useParams, Link } from "react-router-dom";

const Country = () => {
  const { country } = useParams();

  return (
    <div>
      <h1>{country}</h1>
      <Link to={`/?search=${country}`}>Map</Link>
    </div>
  );
};
export default transition(Country);
