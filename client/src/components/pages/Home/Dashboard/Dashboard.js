import React from "react";

// Components
import UserInfo from "./UserInfo";
import BankAccountInfo from "./BankAccountInfo";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* User Info */}
      <UserInfo />
      {/* Bank Account Info */}
      <BankAccountInfo />
    </div>
  );
}

export default Dashboard;
