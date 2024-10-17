import React from "react";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function SignUp() {
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
        isLogin={false}
      />
    </div>
  );
}

export default SignUp;
