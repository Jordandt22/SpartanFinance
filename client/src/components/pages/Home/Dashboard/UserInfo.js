import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useUser } from "../../../../context/User/User.context";

function UserInfo() {
  const {
    userState: {
      user: { infoAdded },
    },
  } = useUser();

  return (
    <div className="user-info">
      {/* Header */}
      <header className="user-info__header row">
        <h1 className="user-info__title">Income & Spending Information</h1>
        <NavLink
          className={`user-info__link ${!infoAdded ? "disabled-link" : ""}`}
          to={!infoAdded ? "/" : "/spending"}
        >
          Track Spending
        </NavLink>
      </header>
      {/* Finance Info */}
      {infoAdded ? (
        <div className="row"></div>
      ) : (
        <p className="user-info__disclaimer">
          Please input your financial information to access this feature.
        </p>
      )}
    </div>
  );
}

export default UserInfo;
