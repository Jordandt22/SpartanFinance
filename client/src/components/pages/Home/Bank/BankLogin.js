import React from "react";
import { useFormik } from "formik";

// Schemas
import { BankLoginSchema } from "../../../../schemas/User.schemas";

// Contexts
import { useUser } from "../../../../context/User/User.context";
import { useGlobal } from "../../../../context/Global/Global.context";

function BankLogin() {
  const {
    userState: {
      bank: { logo, isSvg, bankName },
    },
  } = useUser();
  const { showLoading, closeLoading } = useGlobal().state;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      showLoading("Connecting to your bank account...");
      console.log(values);
    },
    validationSchema: BankLoginSchema,
  });

  const inputs = [
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
      placeholder: "Enter your bank password...",
    },
  ];

  return (
    <div className="bank-login">
      <h1 className="bank-login__title">Bank Login</h1>
      {/* Connected Bank */}
      <div className="bank-opt between-row">
        <div className="row">
          {isSvg ? (
            <>{logo}</>
          ) : (
            <img
              src={process.env.PUBLIC_URL + `/assets/images/${logo}.png`}
              alt={bankName}
            />
          )}

          <p className="bank-opt__name">{bankName}</p>
        </div>

        <button className="bank-opt__active">Connected</button>
      </div>

      {/* Bank Login Form */}
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        {/* Inputs */}
        <div className="auth-form__inputs">
          {inputs.map((input) => {
            const { name, label, type, placeholder } = input;
            const { touched, errors } = formik;
            const isError = touched[name] && errors[name];
            const isValid = touched[name] && !errors[name];

            return (
              <div
                key={name}
                className={`auth-form__input-box ${
                  isValid ? "valid-input" : isError ? "error-input" : ""
                }`}
              >
                <label className="auth-form__label" htmlFor={name}>
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  onChange={formik.handleChange}
                  value={formik.values[name]}
                  placeholder={placeholder}
                  className="auth-form__input"
                />
                {isError && <p className="auth-form__error">{errors[name]}</p>}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <button type="submit" className="auth-form__submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default BankLogin;
