import React from "react";
import { NavLink } from "react-router-dom";

function Unavailable() {
  return (
    <div className="unavailable-container">
      <h1 className="unavailable-container__title">Currently Available</h1>
      <p className="unavailable-container__message">
        Sorry, this page hasn't been finished yet.
      </p>
      <NavLink to="/" className="unavailable-container__link">
        Back Home
      </NavLink>
    </div>
  );
}

export default Unavailable;
