import React from "react";

// Components
import UserInfo from "./UserInfo";
import BankAccounts from "./BankAccounts";
import BankCards from "./BankCards";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* User Info */}
      <UserInfo />
      {/* Bank Accouns Info */}
      <BankAccounts />
      {/* Bank Cards Info */}
      <BankCards />
    </div>
  );
}

export default Dashboard;
