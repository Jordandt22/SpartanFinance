import React, { createContext, useContext, useState } from "react";

// Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = (props) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    uid: null,
    accessToken: null,
  });

  const authenticateUser = (accessToken, uid) => {
    setAuthState((curAuthState) => ({
      ...curAuthState,
      isLoggedIn: true,
      uid,
      accessToken,
    }));
  };
  const logoutUser = () => {
    setAuthState((curAuthState) => ({
      ...curAuthState,
      isLoggedIn: false,
      uid: null,
      accessToken: null,
    }));
  };

  return (
    <AuthContext.Provider value={{ authState, authenticateUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
