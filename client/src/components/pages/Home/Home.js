import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../../../context/Auth/Auth.context";
import { useUser } from "../../../context/User/User.context";

// Components
import ConnectToBank from "./Bank/ConnectToBank";
import Dashboard from "./Dashboard/Dashboard";

function Home() {
  const { authState } = useAuth();
  const { userState } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    <div className="home-container">
      {!userState.bank.state.connected ? <ConnectToBank /> : <Dashboard />}
    </div>
  );
}

export default Home;
