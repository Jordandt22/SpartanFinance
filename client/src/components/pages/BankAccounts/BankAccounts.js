import React from "react";

// Contexts
import { useBank } from "../../../context/User/Bank.context";

// Components
import BankAccountInfo from "../../standalone/Bank/BankAccountInfo";

function BankAccounts() {
  const {
    bankData: { accounts },
  } = useBank();

  return (
    <div className="bank-accounts-container container">
      <h1 className="bank-accounts-container__title">My Bank Accounts</h1>
      {accounts.length > 0 ? (
        <div className="bank-accounts">
          {accounts.map((acc) => {
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
      ) : (
        <p className="bank-accounts-container__message">
          You don't have any accounts with this bank.
        </p>
      )}
    </div>
  );
}

export default BankAccounts;
