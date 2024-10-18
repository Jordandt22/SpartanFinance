import React from "react";

// Contexts
import { AuthContextProvider } from "./Auth/Auth.context";
import { FirebaseContextProvider } from "./Firebase/Firebase.context";
import { GlobalContextProvider } from "./Global/Global.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <FirebaseContextProvider>{props.children}</FirebaseContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
