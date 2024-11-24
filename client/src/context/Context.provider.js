import React from "react";

// Contexts
import { AuthContextProvider } from "./Auth/Auth.context";
import { FirebaseContextProvider } from "./Firebase/Firebase.context";
import { GlobalContextProvider } from "./Global/Global.context";
import { UserContextProvider } from "./User/User.context";
import { UserAPIContextProvider } from "./API/UserAPI.context";
import { BankAPIContextProvider } from "./API/BankAPI.context";
import { BankContextProvider } from "./User/Bank.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <BankContextProvider>
            <UserAPIContextProvider>
              <BankAPIContextProvider>
                <FirebaseContextProvider>
                  {props.children}
                </FirebaseContextProvider>
              </BankAPIContextProvider>
            </UserAPIContextProvider>
          </BankContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
