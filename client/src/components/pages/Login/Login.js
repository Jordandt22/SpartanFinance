import React from "react";

// Components
import AuthForm from "../../standalone/Auth/AuthForm";

function Login() {
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
        isLogin={true}
      />
    </div>
  );
}

export default Login;
