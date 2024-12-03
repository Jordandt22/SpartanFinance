import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useAuth } from "../../../context/Auth/Auth.context";
import { useUser } from "../../../context/User/User.context";

function Unavailable() {
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
      className={`unavailable-container ${
        authState.isLoggedIn && connected ? "container" : "top-padding"
      }`}
    >
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
