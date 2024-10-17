import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

// Schemas
import { LoginSchema, SignupSchema } from "../../../schemas/User.schemas";

// Components
import AuthSideContent from "./AuthSideContent";

function AuthForm(props) {
  const { initialValues, inputs, isLogin } = props;
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: isLogin ? LoginSchema : SignupSchema,
  });

  return (
    <div
      className={`auth-container center ${
        !isLogin ? "auth-signup-container" : ""
      }`}
    >
      <header className="auth-container__header row">
        <img
          src={process.env.PUBLIC_URL + "/assets/icons/sword-logo.png"}
          alt="Spartan Finance"
        />
        <h1>Spartan Finance</h1>
      </header>

      <div className="auth-container__content row">
        <form className="auth-form" onSubmit={formik.handleSubmit}>
          <h2 className="auth-form__title">{isLogin ? "Log In" : "Sign Up"}</h2>

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
                  {isError && (
                    <p className="auth-form__error">{errors[name]}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-form__submit">
            {isLogin ? "Log In" : "Sign Up"}
          </button>

          <div className="auth-form__options">
            <div className="between-row">
              <hr />
              <p>or</p>
              <hr />
            </div>
          </div>

          {/* Google Button */}
          <button type="button" className="auth-form__google center">
            <img
              src={process.env.PUBLIC_URL + "/assets/icons/google-icon.png"}
              alt="Google"
            />
            {isLogin ? "Log in with Google" : "Sign up with Google"}
          </button>

          {/* Other Auth Link */}
          <div className="center">
            <NavLink
              className="auth-form__link"
              to={isLogin ? "/signup" : "/login"}
            >
              {isLogin
                ? "Don't have an account yet? "
                : "Already have an account? "}
              <span>{isLogin ? "Sign Up" : "Log In"}</span>
            </NavLink>
          </div>
        </form>
        {isLogin && <AuthSideContent />}
      </div>
    </div>
  );
}

export default AuthForm;
