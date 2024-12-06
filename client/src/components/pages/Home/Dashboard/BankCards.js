import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useBank } from "../../../../context/User/Bank.context";

// Components
import BankCardInfo from "../../../standalone/Bank/BankCardInfo";

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
        {bankData.cards.length > 0 ? (
          <>
            {bankData.cards.slice(0, 2).map((card) => {
              const { currentBalance, cardLimit, type, _id: id } = card;

              return (
                <BankCardInfo
                  key={id}
                  currentBalance={currentBalance}
                  cardLimit={cardLimit}
                  type={type}
                  id={id}
                />
              );
            })}
          </>
        ) : (
          <p className="ba-info__message">
            You don't have any cards with this bank.
          </p>
        )}
      </div>
    </div>
  );
}

export default BankCards;
