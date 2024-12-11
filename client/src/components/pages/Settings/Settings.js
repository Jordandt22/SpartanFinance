import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useUser } from "../../../context/User/User.context";

function Settings() {
  const {
    userState: {
      user: { username, email },
    },
  } = useUser();

  return (
    <div className="container settings-container">
      <h1 className="settings-container__title">Settings</h1>
      <p className="settings-container__info">
        <strong>Email: </strong>
        {email}
      </p>
      <p className="settings-container__info">
        <strong>Username: </strong>
        {username}
      </p>
      <NavLink className="settings-container__link" to="/edit">
        Update Information
      </NavLink>
    </div>
  );
}

export default Settings;
