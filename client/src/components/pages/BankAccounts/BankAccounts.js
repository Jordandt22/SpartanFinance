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
    <div className="bank-accounts-container">
      <h1 className="bank-accounts-container__title">My Bank Accounts</h1>
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
    </div>
  );
}

export default BankAccounts;
