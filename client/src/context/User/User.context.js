import React, { createContext, useContext, useState } from "react";

// User Context
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserContextProvider = (props) => {
  const [userState, setUserState] = useState({
    user: {
      email: null,
      username: null,
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
  });

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

  return (
    <UserContext.Provider
      value={{
        userState,
        userFunctions: { updateUser },
        bankFunctions: { finishBankLogin, setToStepTwo },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
