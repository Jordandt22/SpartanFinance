import React from "react";

// Contexts
import { useFirebase } from "../../../context/Firebase/Firebase.context";

function Dashboard() {
  const { logoutFirebaseUser } = useFirebase().functions;

  return (
    <div>
      Dashboard
      <button onClick={logoutFirebaseUser}>Logout</button>
    </div>
  );
}

export default Dashboard;
