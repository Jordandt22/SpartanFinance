import React, { createContext, useContext, useState } from "react";

// User Context
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserContextProvider = (props) => {
  const [userState, setUserState] = useState({
    bank: {
      connected: false,
      step: 1,
      bankName: "",
      logo: null,
      isSvg: false,
    },
  });

  const setToStepTwo = (bankInfo) =>
    setUserState((userState) => ({
      ...userState,
      bank: { ...userState.bank, step: 2, ...bankInfo },
    }));

  return (
    <UserContext.Provider
      value={{ userState, bankFunctions: { setToStepTwo } }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
