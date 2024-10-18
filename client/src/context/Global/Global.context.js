import React, { createContext, useContext, useState } from "react";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalContextProvider = (props) => {
  const [loading, setLoading] = useState({
    status: false,
    message: "Loading...",
  });

  const showLoading = (message) => setLoading({ status: true, message });
  const closeLoading = () =>
    setLoading({ status: false, message: "Loading..." });

  return (
    <GlobalContext.Provider
      value={{ state: { loading, showLoading, closeLoading } }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
