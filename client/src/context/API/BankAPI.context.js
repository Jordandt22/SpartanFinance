import React, { createContext, useContext } from "react";
import Axios from "axios";

// Contexts
import { useAuth } from "../Auth/Auth.context";

// Bank API Context
const BankAPIContext = createContext();
export const useBankAPI = () => useContext(BankAPIContext);
export const BankAPIContextProvider = (props) => {
  const { REACT_APP_SPARTAN_API_URI } = process.env;
  const getBankAPIURI = (uid, path) =>
    REACT_APP_SPARTAN_API_URI + `/bank/${uid}${path ? `/${path}` : ""}`;
  const {
    authState: { uid, accessToken },
  } = useAuth();

  // Setting Access Token
  const config = (accessToken, headerOptions) => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headerOptions,
    },
  });

  // POST: Connect the User to their Bank
  const connectToBank = (data, cb) =>
    Axios.post(getBankAPIURI(uid, "connect"), data, config(accessToken))
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // POST: Add Bank Account Spending Limit
  const addAccountSpendingLimit = (data, cb) =>
    Axios.post(getBankAPIURI(uid, "limit/account"), data, config(accessToken))
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // POST: Add Bank Card Spending Limit
  const addCardSpendingLimit = (data, cb) =>
    Axios.post(getBankAPIURI(uid, "limit/card"), data, config(accessToken))
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  return (
    <BankAPIContext.Provider
      value={{
        functions: {
          connectToBank,
          addAccountSpendingLimit,
          addCardSpendingLimit,
        },
      }}
    >
      {props.children}
    </BankAPIContext.Provider>
  );
};
