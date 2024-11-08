import React from "react";

// Contexts
import { useUser } from "../../../../context/User/User.context";

// Components
import BankOptions from "./BankOptions";
import BankLogin from "./BankLogin";

function ConnectToBank() {
  const {
    userState: {
      bank: { step },
    },
  } = useUser();

  return (
    <div className="bank-auth-container center">
      <header className="bank-auth-container__header row">
        <img
          src={process.env.PUBLIC_URL + "/assets/icons/sword-logo.png"}
          alt="Spartan Finance"
        />
        <h1>Spartan Finance</h1>
      </header>

      {/* Bank Options */}
      {step === 1 ? <BankOptions /> : <BankLogin />}
    </div>
  );
}

export default ConnectToBank;
