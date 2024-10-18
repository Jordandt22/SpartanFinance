import React from "react";

// Contexts
import { useFirebase } from "../../../context/Firebase/Firebase.context";
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function Login() {
  const { signInEmailUser } = useFirebase().functions;
  const { showLoading, closeLoading } = useGlobal().state;

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
            if (error) return console.log(error);

            console.log(user);
            closeLoading();
          });
        }}
        isLogin={true}
      />
    </div>
  );
}

export default Login;
