import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/portal.css";

const Portal = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("overflowHidden");
    return () => {
      document.body.classList.remove("overflowHidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="portalOverlay" />
      <div className="portal">{children}</div>
    </>,
    document.getElementById("portal")
  );
};

export default Portal;
