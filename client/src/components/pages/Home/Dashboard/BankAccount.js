import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useBank } from "../../../../context/User/Bank.context";

// Util
import { currencyFormater } from "../../../../util/util";

// SVGs
import MoreIcon from "../../../svg/icons/MoreIcon";

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
            <div key={id} className="bank-account">
              <header className="bank-account__header between-row">
                <h2 className="bank-account__title">
                  {type.toLowerCase()} Account
                </h2>
                <button type="button" className="bank-account__more center">
                  <MoreIcon />
                </button>
              </header>
              <p className="bank-account__id">ID: {id}</p>
              <p className="bank-account__balance">
                {currencyFormater(currentBalance)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BankAccounts;
