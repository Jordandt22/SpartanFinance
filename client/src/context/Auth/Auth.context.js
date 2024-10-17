import React, { createContext, useContext, useState } from "react";

// Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = (props) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider value={{ authState }}>
      {props.children}
    </AuthContext.Provider>
  );
};
