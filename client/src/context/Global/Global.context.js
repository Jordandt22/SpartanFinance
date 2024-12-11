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

  // User Info Form State
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);

  // Spending Limit Form State
  const [spendingLimitFormState, setShowSpendingLimitForm] = useState({
    show: false,
    type: null,
    ID: null,
  });

  // Loading Functions
  const showLoading = (message) => setLoading({ status: true, message });
  const closeLoading = () =>
    setLoading({ status: false, message: "Loading..." });

  // User Info Form Functions
  const openUserInfoForm = () => setShowUserInfoForm(true);
  const closeUserInfoForm = () => setShowUserInfoForm(false);

  // Spending Limit Form Functions
  const openSpendingLimitForm = (type, ID) =>
    setShowSpendingLimitForm({ show: true, type, ID });
  const closeSpendingLimitForm = () =>
    setShowSpendingLimitForm({
      show: false,
      type: null,
      ID: null,
    });

  return (
    <GlobalContext.Provider
      value={{
        state: { loading, showLoading, closeLoading },
        UI: {
          showUserInfoForm,
          openUserInfoForm,
          closeUserInfoForm,
          spendingLimitFormState,
          openSpendingLimitForm,
          closeSpendingLimitForm,
        },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
