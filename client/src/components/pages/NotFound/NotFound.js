import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useAuth } from "../../../context/Auth/Auth.context";
import { useUser } from "../../../context/User/User.context";

function NotFound() {
  const { authState } = useAuth();
  const {
    userState: {
      bank: {
        state: { connected },
      },
    },
  } = useUser();

  return (
    <div
      className={`not-found-container ${
        authState.isLoggedIn && connected ? "container" : "top-padding"
      }`}
    >
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
