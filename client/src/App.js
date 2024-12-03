import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import BankAccount from "./components/pages/BankAccount/BankAccount";
import NotFound from "./components/pages/NotFound/NotFound";
import Unavailable from "./components/pages/Unavailable/Unavailable";

function App() {
  const {
    state: { loading },
    UI: { showUserInfoForm },
  } = useGlobal();
  const { pathname } = useLocation();
  const { authState } = useAuth();
  const {
    userState: {
      bank: {
        state: { connected },
      },
    },
  } = useUser();

  useEffect(() => {
    localStorage.setItem("LAST_PAGE", pathname);
  }, [pathname]);

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
        <Route path="/account/:accountID" element={<BankAccount />} />
        <Route path="/cards" element={<BankCards />} />

        {/* Unavailable Pages */}
        <Route path="/investments" element={<Unavailable />} />
        <Route path="/help" element={<Unavailable />} />
        <Route path="/settings" element={<Unavailable />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* User Info Form */}
      {showUserInfoForm && <UserInfoForm />}

      {/* Loading Spinner */}
      {loading.status && <LoadingSpinner />}
    </div>
  );
}

export default App;
