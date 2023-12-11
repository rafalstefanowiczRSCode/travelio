import React from "react";
import { MdErrorOutline } from "react-icons/md";
import "../styles/error.css";
import planeCrash from "../icons/crash.svg";

const Error = ({ message, crash }) => {
  return (
    <div className="errorContainer">
      {crash && <img src={planeCrash} className="errorImage"></img>}
      <span className="errorMessage">
        <MdErrorOutline className="errorIcon" /> {message}
      </span>
    </div>
  );
};

export default Error;
