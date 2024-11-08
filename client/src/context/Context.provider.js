import React from "react";

// Contexts
import { AuthContextProvider } from "./Auth/Auth.context";
import { FirebaseContextProvider } from "./Firebase/Firebase.context";
import { GlobalContextProvider } from "./Global/Global.context";
import { UserContextProvider } from "./User/User.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <FirebaseContextProvider>{props.children}</FirebaseContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
