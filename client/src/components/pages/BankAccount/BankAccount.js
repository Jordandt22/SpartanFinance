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

  return <div>BankAccount</div>;
}
