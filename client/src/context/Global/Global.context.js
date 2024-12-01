import React, { createContext, useContext, useState } from "react";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalContextProvider = (props) => {
  // Loading State
  const [loading, setLoading] = useState({
    status: false,
    message: "Loading...",
  });

  // User Info State
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);

  // Loading Functions
  const showLoading = (message) => setLoading({ status: true, message });
  const closeLoading = () =>
    setLoading({ status: false, message: "Loading..." });

  // User Info Functions
  const openUserInfoForm = () => setShowUserInfoForm(true);
  const closeUserInfoForm = () => setShowUserInfoForm(false);

  return (
    <GlobalContext.Provider
      value={{
        state: { loading, showLoading, closeLoading },
        UI: { showUserInfoForm, openUserInfoForm, closeUserInfoForm },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
