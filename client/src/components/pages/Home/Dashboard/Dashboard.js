import React from "react";

// Contexts
import { useFirebase } from "../../../../context/Firebase/Firebase.context";

function Dashboard() {
  const { logoutFirebaseUser } = useFirebase().functions;

  return (
    <div className="dashboard-container">
    </div>
  );
}

export default Dashboard;
