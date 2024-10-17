import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../../../context/Auth/Auth.context";

function Home() {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return <div>Home</div>;
}

export default Home;
