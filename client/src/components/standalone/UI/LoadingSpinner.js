import React from "react";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";

function LoadingSpinner() {
  const { loading } = useGlobal().state;

  return (
    <div className="loading-shadow center">
      <span className="loader"></span>
      <p>{loading.message}</p>
    </div>
  );
}

export default LoadingSpinner;
