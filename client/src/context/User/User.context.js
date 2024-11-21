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
      bankID: null,
      connected: false,
      step: 1,
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
        email,
        username,
      },
    }));

  // Update Bank Info
  const updateBank = (bankID, bankInfo) =>
    setUserState((prevState) => ({
      ...prevState,
      bank: {
        bankID,
        connected: true,
        step: 0,
        ...bankInfo,
      },
    }));

  // Move to Step Two of Bank Login Process
  const setToStepTwo = (bankInfo) =>
    setUserState((userState) => ({
      ...userState,
      bank: { ...userState.bank, step: 2, ...bankInfo },
    }));

  return (
    <UserContext.Provider
      value={{
        userState,
        userFunctions: { updateUser },
        bankFunctions: { updateBank, setToStepTwo },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
