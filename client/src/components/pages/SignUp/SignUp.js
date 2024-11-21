import React from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useFirebase } from "../../../context/Firebase/Firebase.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useUserAPI } from "../../../context/API/UserAPI.context";
import { useAuth } from "../../../context/Auth/Auth.context";
import { useUser } from "../../../context/User/User.context";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function SignUp() {
  const { createEmailUser } = useFirebase().functions;
  const { showLoading, closeLoading } = useGlobal().state;
  const { createUser } = useUserAPI().functions;
  const { authenticateUser } = useAuth();
  const {
    userFunctions: { updateUser },
    bankFunctions: { updateBank },
  } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <AuthForm
        initialValues={{
          email: "test@gmail.com",
          username: "Jordan",
          password: "Password123411$",
          confirmPassword: "Password123411$",
        }}
        inputs={[
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Example@gmail.com",
          },
          {
            label: "Username",
            name: "username",
            type: "text",
            placeholder: "Create a username...",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Create a password...",
          },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            placeholder: "Retype your password...",
          },
        ]}
        onSubmit={(values, { setErrors }) => {
          const { email, username, password } = values;
          showLoading("Creating your new account...");
          createEmailUser(email, password, (user, error) => {
            if (error) {
              if (error.type === "FIREBASE") {
                closeLoading();
                return setErrors(error.form);
              }
            }

            // Create Database User
            const { uid, accessToken } = user;
            createUser(
              uid,
              accessToken,
              { email, username },
              (data, APIError) => {
                if (APIError || data.error) return console.log(APIError.error);

                // Change Auth State to Logged In
                authenticateUser(accessToken, uid);

                // Update User Info in User Context
                updateUser(email, username);

                // Check if BankID exists
                const { user } = data;
                if (user.bankID) updateBank(user.bankID, data.bankInfo);

                // Auth Finished
                closeLoading();
                navigate("/");
              }
            );
          });
        }}
        isLogin={false}
      />
    </div>
  );
}

export default SignUp;
