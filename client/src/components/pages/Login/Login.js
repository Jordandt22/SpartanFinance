import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useFirebase } from "../../../context/Firebase/Firebase.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useUserAPI } from "../../../context/API/UserAPI.context";
import { useAuth } from "../../../context/Auth/Auth.context";
import { useUser } from "../../../context/User/User.context";
import { useBank } from "../../../context/User/Bank.context";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function Login() {
  const { signInEmailUser } = useFirebase().functions;
  const { showLoading, closeLoading } = useGlobal().state;
  const { getUser } = useUserAPI().functions;
  const { authState, authenticateUser } = useAuth();
  const {
    userFunctions: { updateUser },
    bankFunctions: { finishBankLogin },
  } = useUser();
  const { updateBankData } = useBank().functions;
  const navigate = useNavigate();

  // IF Auth send to Home Page
  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    <div>
      <AuthForm
        initialValues={{
          email: "",
          password: "",
        }}
        inputs={[
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Example@gmail.com",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password...",
          },
        ]}
        onSubmit={(values, { setErrors }) => {
          const { email, password } = values;
          showLoading("Logging you into your account...");
          signInEmailUser(email, password, (user, error) => {
            if (error) {
              if (error.type === "FIREBASE") {
                closeLoading();
                return setErrors(error.form);
              }
            }
            // Get Database User
            const { uid, accessToken } = user;
            getUser(uid, accessToken, (data, APIError) => {
              if (APIError || data.error) return console.log(APIError.error);

              // Change Auth State to Logged In
              authenticateUser(accessToken, uid);

              const { username, financialInfo } = data?.user;

              // Update User Info in User Context
              updateUser(email, username, financialInfo);

              // Check if BankID exists
              const bankID = data?.user?.bankID;
              if (bankID) {
                updateBankData({ bankID, ...data?.user?.bankInfo });
                finishBankLogin();
              }

              // Auth Finished
              closeLoading();
              navigate("/");
            });
          });
        }}
        isLogin={true}
      />
    </div>
  );
}

export default Login;
