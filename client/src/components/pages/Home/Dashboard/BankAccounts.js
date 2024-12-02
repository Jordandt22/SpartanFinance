import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useBank } from "../../../../context/User/Bank.context";

// Components
import BankAccountInfo from "../../../standalone/Bank/BankAccountInfo";

function BankAccounts() {
  const { bankData } = useBank();

  return (
    <div className="ba-info">
      {/* Header */}
      <header className="ba-info__header row">
        <h1 className="ba-info__title">Bank Accounts</h1>
        <NavLink className="ba-info__link" to="/accounts">
          View All
        </NavLink>
      </header>
      {/* Bank Accounts */}
      <div className="row">
        {bankData.accounts.slice(0, 2).map((acc) => {
          const { currentBalance, type, _id: id } = acc;

          return (
            <BankAccountInfo
              key={id}
              currentBalance={currentBalance}
              type={type}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BankAccounts;
