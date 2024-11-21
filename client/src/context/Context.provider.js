import React from "react";

// Contexts
import { AuthContextProvider } from "./Auth/Auth.context";
import { FirebaseContextProvider } from "./Firebase/Firebase.context";
import { GlobalContextProvider } from "./Global/Global.context";
import { UserContextProvider } from "./User/User.context";
import { UserAPIContextProvider } from "./API/UserAPI.context";
import { BankAPIContextProvider } from "./API/BankAPI.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <FirebaseContextProvider>
            <UserAPIContextProvider>
              <BankAPIContextProvider>{props.children}</BankAPIContextProvider>
            </UserAPIContextProvider>
          </FirebaseContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
