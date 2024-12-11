import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Contexts
import { useFirebase } from "../../../context/Firebase/Firebase.context";

// SVGs
import Plus from "../../svg/Plus";
import HomeIcon from "../../svg/icons/HomeIcon";
import BankIcon from "../../svg/icons/BankIcon";
import CreditCardIcon from "../../svg/icons/CreditCardIcon";
import GraphIcon from "../../svg/icons/GraphIcon";
import RobotIcon from "../../svg/icons/RobotIcon";
import Settings from "../../svg/icons/Settings";

function Sidebar() {
  const { pathname } = useLocation();
  const { logoutFirebaseUser } = useFirebase().functions;
  const links = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon />,
      fill: true,
    },
    {
      label: "My Bank Accounts",
      path: "/accounts",
      icon: <BankIcon />,
      fill: true,
    },
    {
      label: "My Cards",
      path: "/cards",
      icon: <CreditCardIcon />,
      fill: false,
    },
    {
      label: "Investment Suggestions",
      path: "/investments",
      icon: <GraphIcon />,
      fill: false,
    },
    {
      label: "AI Helper",
      path: "/help",
      icon: <RobotIcon />,
      fill: false,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <Settings />,
      fill: true,
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="db-sidebar between-row">
      <div className="center-vertical">
        {/* Logo */}
        <div className="db-sidebar__logo-box row">
          <img
            src={process.env.PUBLIC_URL + "/assets/icons/sword-logo.png"}
            alt="Spartan Finance"
          />
          <h1>Spartan Finance</h1>
        </div>

        {/* Buttons */}
        <div className="db-sidebar__btns">
          <button type="button" className="row">
            <span className="center">
              <Plus />
            </span>
            New Bank Account
          </button>

          <button type="button" className="row">
            <span className="center">
              <Plus />
            </span>
            New Bank Card
          </button>
        </div>
        <hr />

        {/* Links */}
        <div className="db-sidebar__links">
          {links.map((link) => {
            const { label, path, icon, fill } = link;
            const isActive = pathname === path;

            return (
              <NavLink
                key={label}
                to={path}
                className={`row ${fill ? "fill-icon" : "stroke-icon"} ${
                  isActive ? (fill ? "active-fill" : "active-stroke") : ""
                }`}
              >
                {icon}
                {label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Logout Btn */}
      <button
        type="button"
        className="db-sidebar__logout"
        onClick={() => {
          logoutFirebaseUser();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
