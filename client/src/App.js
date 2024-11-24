import React from "react";
import { Routes, Route } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/Global/Global.context";
import { useAuth } from "./context/Auth/Auth.context";

// Components
import Home from "./components/pages/Home/Home";
import SignUp from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import LoadingSpinner from "./components/standalone/UI/LoadingSpinner";
import Sidebar from "./components/standalone/Navbar/Sidebar";

function App() {
  const {
    state: { loading },
  } = useGlobal();
  const { authState } = useAuth();

  return (
    <div className="App">
      {authState.isLoggedIn && <Sidebar />}

      <Routes>
        {/* For Mobile <Navigate to="/auth" replace /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Loading Spinner */}
      {loading.status && <LoadingSpinner />}
    </div>
  );
}

export default App;
