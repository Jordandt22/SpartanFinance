import React from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useFirebase } from "../../../context/Firebase/Firebase.context";
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function Login() {
  const { signInEmailUser } = useFirebase().functions;
  const { showLoading, closeLoading } = useGlobal().state;
  const navigate = useNavigate();

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

            console.log(user);
            closeLoading();
            navigate("/");
          });
        }}
        isLogin={true}
      />
    </div>
  );
}

export default Login;
