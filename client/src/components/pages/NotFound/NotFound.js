import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-container__title">
        4<span>0</span>4
      </h1>
      <p className="not-found-container__message">
        Sorry, the page or resource could not be found.
      </p>
      <NavLink to="/" className="not-found-container__link">
        Back Home
      </NavLink>
    </div>
  );
}

export default NotFound;
