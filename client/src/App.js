import React from "react";
import { Routes, Route } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/Global/Global.context";
import { useAuth } from "./context/Auth/Auth.context";
import { useUser } from "./context/User/User.context";

// Components
import Home from "./components/pages/Home/Home";
import SignUp from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import LoadingSpinner from "./components/standalone/UI/LoadingSpinner";
import Sidebar from "./components/standalone/Navbar/Sidebar";
import UserInfoForm from "./components/standalone/Forms/UserInfoForm";
import BankAccounts from "./components/pages/BankAccounts/BankAccounts";
import BankCards from "./components/pages/BankCards/BankCards";

function App() {
  const {
    state: { loading },
    UI: { showUserInfoForm },
  } = useGlobal();
  const { authState } = useAuth();
  const {
    userState: {
      bank: {
        state: { connected },
      },
    },
  } = useUser();

  return (
    <div className="App">
      {authState.isLoggedIn && connected && <Sidebar />}

      <Routes>
        {/* For Mobile <Navigate to="/auth" replace /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Bank Pages */}
        <Route path="/accounts" element={<BankAccounts />} />
        <Route path="/cards" element={<BankCards />} />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* User Info Form */}
      {showUserInfoForm && <UserInfoForm />}

      {/* Loading Spinner */}
      {loading.status && <LoadingSpinner />}
    </div>
  );
}

export default App;
