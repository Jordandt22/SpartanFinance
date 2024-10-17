import React from "react";

// Contexts
import { AuthContextProvider } from "./Auth/Auth.context";

function ContextProvider(props) {
  return <AuthContextProvider>{props.children}</AuthContextProvider>;
}

export default ContextProvider;
