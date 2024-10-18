import React from "react";
import { Routes, Route } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/Global/Global.context";

// Components
import Home from "./components/pages/Home/Home";
import SignUp from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import LoadingSpinner from "./components/standalone/UI/LoadingSpinner";

function App() {
  const {
    state: { loading },
  } = useGlobal();

  return (
    <div className="App">
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
