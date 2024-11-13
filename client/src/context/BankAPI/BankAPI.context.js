import React, { createContext, useContext } from "react";
import axios from "axios";

// Bank API Context
const BankAPIContext = createContext();
export const useBankAPI = () => useContext(BankAPIContext);
export const BankAPIContextProvider = (props) => {
  const { REACT_APP_BANK_API_URI } = process.env;
  const getUsersURI = (path) => REACT_APP_BANK_API_URI + "/users" + path;
  const getBankURI = (path) => REACT_APP_BANK_API_URI + "/bank" + path;

  return (
    <BankAPIContext.Provider value={{}}>
      {props.children}
    </BankAPIContext.Provider>
  );
};
