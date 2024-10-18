import React from "react";

// Context
import { useFirebase } from "../../../context/Firebase/Firebase.context";
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function SignUp() {
  const { createEmailUser } = useFirebase().functions;
  const { showLoading, closeLoading } = useGlobal().state;

  return (
    <div>
      <AuthForm
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
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
          const { email, password } = values;
          showLoading("Creating your new account...");
          createEmailUser(email, password, (user, error) => {
            if (error) return console.log(error);

            console.log(user);
            closeLoading();
          });
        }}
        isLogin={false}
      />
    </div>
  );
}

export default SignUp;
