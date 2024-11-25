import React from "react";
import { NavLink } from "react-router-dom";

function BankAccountInfo() {
  return (
    <div className="ba-info">
      {/* Header */}
      <header className="ba-info__header row">
        <h1 className="ba-info__title">Bank Accounts</h1>
        <NavLink className="ba-info__link" to="/accounts">
          View All
        </NavLink>
      </header>
    </div>
  );
}

export default BankAccountInfo;
