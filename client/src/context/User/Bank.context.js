import React, { createContext, useContext, useState } from "react";

// Bank Data Context
const BankContext = createContext();
export const useBank = () => useContext(BankContext);
export const BankContextProvider = (props) => {
  const [bankData, setBankData] = useState({
    email: null,
    password: null,
    accounts: [],
    cards: [],
  });

  // Update Bank Data
  const updateBankData = (bankData) =>
    setBankData((prevState) => ({ ...prevState, ...bankData }));

  return (
    <BankContext.Provider value={{ bankData, functions: { updateBankData } }}>
      {props.children}
    </BankContext.Provider>
  );
};
