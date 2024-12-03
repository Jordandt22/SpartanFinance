import React from "react";
import { useParams } from "react-router-dom";

// Contexts
import { useBank } from "../../../context/User/Bank.context";

// Components
import NotFound from "../NotFound/NotFound";

export default function BankAccount() {
  const { accountID } = useParams();
  const {
    bankData: { accounts },
  } = useBank();
  const bankAccount = accounts.find((acc) => acc._id === accountID);

  if (!bankAccount) {
    return <NotFound />;
  }

  const { type } = bankAccount;
  return (
    <div className="BA-container container">
      <h1 className="BA-container__title">{type.toLowerCase()} Account</h1>
      <h2 className="BA-container__sub-title">ID: </h2>
    </div>
  );
}
