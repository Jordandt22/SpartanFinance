import React, { createContext, useContext, useState } from "react";

// User Context
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserContextProvider = (props) => {
  const defaultUserState = {
    user: {
      email: null,
      username: null,
      monthlyIncome: 0,
      monthlySpending: 0,
      monthlySavings: 0,
      infoAdded: false,
    },
    bank: {
      state: {
        connected: false,
        step: 1,
      },
      bankName: "",
      logo: null,
      isSvg: false,
    },
  };
  const [userState, setUserState] = useState(defaultUserState);

  // Update User Info
  const updateUser = (email, username) =>
    setUserState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        email,
        username,
      },
    }));

  // Move to Step Two of Bank Login Process
  const setToStepTwo = (bankInfo) =>
    setUserState((userState) => ({
      ...userState,
      bank: {
        ...userState.bank,
        state: { ...userState.bank.state, step: 2 },
        ...bankInfo,
      },
    }));

  // Finish Bank Login
  const finishBankLogin = () =>
    setUserState((prevState) => ({
      ...prevState,
      bank: {
        ...prevState.bank,
        state: {
          ...prevState.bank.state,
          connected: true,
          step: 0,
        },
      },
    }));

  // Reset User Context
  const resetUserContext = () => setUserState(defaultUserState);

  return (
    <UserContext.Provider
      value={{
        userState,
        userFunctions: { updateUser },
        bankFunctions: { finishBankLogin, setToStepTwo },
        resetUserContext,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
