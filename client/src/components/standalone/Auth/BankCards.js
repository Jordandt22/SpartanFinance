import React from "react";

// Contexts
import { useBank } from "../../../context/User/Bank.context";

// Components
import BankCardInfo from "../../standalone/Bank/BankCardInfo";

function BankCards() {
  const {
    bankData: { cards },
  } = useBank();

  return (
    <div className="bank-accounts-container container">
      <h1 className="bank-accounts-container__title">My Bank Cards</h1>
      <div className="bank-accounts">
        {cards.map((acc) => {
          const { currentBalance, cardLimit, type, _id: id } = acc;

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
      </div>
    </div>
  );
}

export default BankCards;
