import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useBank } from "../../../../context/User/Bank.context";

// Util
import { currencyFormater } from "../../../../util/util";

// SVGs
import MoreIcon from "../../../svg/icons/MoreIcon";

function BankCards() {
  const { bankData } = useBank();

  return (
    <div className="ba-info">
      {/* Header */}
      <header className="ba-info__header row">
        <h1 className="ba-info__title">Bank Cards</h1>
        <NavLink className="ba-info__link" to="/cards">
          View All
        </NavLink>
      </header>
      {/* Bank Accounts */}
      <div className="row">
        {bankData.cards.slice(0, 2).map((card) => {
          const { currentBalance, cardLimit, type, _id: id } = card;
          const percentageUsed = (currentBalance / cardLimit) * 100;
          let percentageLevel = "green";
          if (percentageUsed >= 80) {
            percentageLevel = "red";
          } else if (percentageUsed >= 50) {
            percentageLevel = "yellow";
          }

          return (
            <div
              key={id}
              className={`bank-account bank-card bank-card__pl-${percentageLevel}`}
            >
              <header className="bank-account__header between-row">
                <h2 className="bank-account__title">
                  {type.toLowerCase()} Card
                </h2>
                <button type="button" className="bank-account__more center">
                  <MoreIcon />
                </button>
              </header>
              <p className="bank-account__id">ID: {id}</p>
              <p className="bank-account__balance">
                {currencyFormater(currentBalance)} /{" "}
                {currencyFormater(cardLimit)}
              </p>
              <div className="bank-card__progress">
                <div
                  className="bank-card__progress-amount"
                  style={{ width: `${percentageUsed}%` }}
                ></div>
              </div>
              <p className="bank-card__spent">
                {percentageUsed.toFixed(2)}% Used
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BankCards;
